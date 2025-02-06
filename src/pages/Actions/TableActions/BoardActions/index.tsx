import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { IAction } from "../../../../interfaces/actions";
import { Card } from "./Card";
import * as S from "./styles";

interface IColumns {
  [key: string]: IAction[];
}

interface IBoardActions {
  setIsModalStartOrFinishAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalSeeDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalDisableAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalExecuteAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalCreateActionInProgress: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setIsModalCreateActionFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalAddAction: React.Dispatch<React.SetStateAction<boolean>>;
  actions: IAction[];
  setActionInfo: React.Dispatch<React.SetStateAction<IAction>>;
}

export function BoardActions({
  actions,
  setActionInfo,
  setIsModalSeeDetails,
  setIsModalStartOrFinishAction,
  setIsModalDisableAction,
  setIsModalExecuteAction,
  setIsModalCreateActionInProgress,
  setIsModalCreateActionFinished,
  setIsModalAddAction,
}: IBoardActions) {
  const STATUS_MAP: { [key: number]: string } = {
    1: "A iniciar",
    2: "Em execução",
    3: "Executadas",
  };

  const initializeColumns = (actionsData: IAction[]) => {
    const initialData: IColumns = Object.values(STATUS_MAP).reduce(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {} as IColumns
    );

    actionsData.forEach((action) => {
      let statusName = STATUS_MAP[action.status];

      // Redistribuir atrasadas
      if (action.status === 4) {
        statusName = STATUS_MAP[1];
      }
      if (action.status === 5) {
        statusName = STATUS_MAP[2];
      }
      // Adicionar status 7 na coluna de executadas
      if (action.status === 7) {
        statusName = STATUS_MAP[3];
      }

      if (statusName) {
        initialData[statusName].push(action);
      }
    });

    return initialData;
  };

  const [columns, setColumns] = useState<IColumns>(() => initializeColumns(actions));

  useEffect(() => {
    setColumns(initializeColumns(actions));
  }, [actions]);

  const [dragSource, setDragSource] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFromColumn, setDraggedFromColumn] = useState<string | null>(
    null
  );

  const handleReturnToSource = (action: IAction) => {
    if (dragSource && dragSource.droppableId) {
      const sourceCol = [...(columns[dragSource.droppableId] || [])];
      sourceCol.push(action);
      setColumns({
        ...columns,
        [dragSource.droppableId]: sourceCol,
      });
    }
  };

  const handleOpenModalSeeDetails = (action: IAction) => {
    setActionInfo(action);
    setIsModalSeeDetails(true);
  };

  const isColumnDisabled = (targetStatus: string) => {
    if (!draggedFromColumn) return false;

    // De "A iniciar"
    if (draggedFromColumn === STATUS_MAP[1]) {
      return targetStatus === STATUS_MAP[1]; // Só não pode voltar pra mesma coluna
    }

    // De "Em execução"
    if (draggedFromColumn === STATUS_MAP[2]) {
      return targetStatus === STATUS_MAP[1] || targetStatus === STATUS_MAP[2]; // Não pode ir pra "A iniciar" nem ficar em "Em execução"
    }

    // De "Executadas" ou "Desativadas" ou ações com status 3 ou 7
    if (
      draggedFromColumn === STATUS_MAP[3] ||
      draggedFromColumn === STATUS_MAP[4] ||
      actions.find((a) => a.status === 3 || a.status === 7)
    ) {
      return true; // Todas as colunas ficam desabilitadas
    }

    return false;
  };

  const onDragStart = (start: DragStart) => {
    setIsDragging(true);
    setDraggedFromColumn(start.source.droppableId);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    setDraggedFromColumn(null);
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = [...columns[source.droppableId]];
    const [movedAction] = sourceCol.splice(source.index, 1);
    setDragSource(source);

    // Verifica se a ação está desativada
    if (movedAction.is_active === 0) {
      setActionInfo(movedAction);
      setIsModalDisableAction(true); // Abre o modal de desbloquear
      handleReturnToSource(movedAction); // Retorna o card para posição original
      return;
    }

    // De "A iniciar"
    if (source.droppableId === STATUS_MAP[1]) {
      if (destination.droppableId === STATUS_MAP[2]) {
        // Para "Em execução"
        setActionInfo(movedAction);
        setIsModalStartOrFinishAction(true);
        return;
      }
      if (destination.droppableId === STATUS_MAP[3]) {
        // Para "Executadas" - precisa definir início e fim
        setActionInfo(movedAction);
        setIsModalExecuteAction(true);
        return;
      }
      if (destination.droppableId === STATUS_MAP[4]) {
        // Para "Desativadas"
        setActionInfo(movedAction);
        setIsModalDisableAction(true);
        return;
      }
    }

    // De "Em execução"
    if (source.droppableId === STATUS_MAP[2]) {
      if (destination.droppableId === STATUS_MAP[3]) {
        // Para "Executadas" - precisa definir apenas a data de fim
        setActionInfo(movedAction);
        setIsModalStartOrFinishAction(true); // Usa o modal de finalizar
        return;
      }
      if (destination.droppableId === STATUS_MAP[4]) {
        // Para "Desativadas"
        setActionInfo(movedAction);
        setIsModalDisableAction(true);
        return;
      }
    }

    // Retorna o card para origem em qualquer outro caso
    handleReturnToSource(movedAction);
  };

  // const renderColumnButton = (status: string) => {
  //   if (
  //     status === STATUS_MAP[1] ||
  //     status === STATUS_MAP[2] ||
  //     status === STATUS_MAP[3]
  //   ) {
  //     return (
  //       <S.ColumnButton
  //         onClick={() =>
  //           status === STATUS_MAP[3]
  //             ? setIsModalCreateActionFinished(true)
  //             : status === STATUS_MAP[1]
  //             ? setIsModalAddAction(true)
  //             : setIsModalCreateActionInProgress(true)
  //         }
  //       >
  //         <FaPlus size={14} />
  //       </S.ColumnButton>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <S.BoardContainer>
          {Object.values(STATUS_MAP).map((status) => (
            <Droppable
              key={status}
              droppableId={status}
              isDropDisabled={isDragging && isColumnDisabled(status)}
            >
              {(provided, snapshot) => (
                <S.Column
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDisabled={isDragging && isColumnDisabled(status)}
                >
                  <S.ColumnHeader>
                    <S.ColumnTitle>{status}</S.ColumnTitle>
                    {/* {renderColumnButton(status)} */}
                  </S.ColumnHeader>
                  <S.CardsContainer>
                    {columns[status].map((action, index) => (
                      <Draggable
                        key={(action.id ?? "").toString()}
                        draggableId={(action.id ?? "").toString()}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            action={action}
                            onClick={() => handleOpenModalSeeDetails(action)}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </S.CardsContainer>
                </S.Column>
              )}
            </Droppable>
          ))}
        </S.BoardContainer>
      </DragDropContext>
    </>
  );
}
