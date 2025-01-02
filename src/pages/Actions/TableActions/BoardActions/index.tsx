import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import * as S from "./styles"; // Seu arquivo de estilos
import { IAction } from "../../../../interfaces/actions";
import { Card } from "./Card";

interface IColumns {
  [key: string]: IAction[];
}

interface IBoardActions {
  setIsModalStartOrFinishAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalSeeDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalDisableAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalExecuteAction: React.Dispatch<React.SetStateAction<boolean>>;
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
}: IBoardActions) {
  const STATUS_MAP: { [key: number]: string } = {
    1: "A iniciar",
    2: "Em execução",
    3: "Executadas"
  };

  const [columns, setColumns] = useState<IColumns>(() => {
    const initialData: IColumns = Object.values(STATUS_MAP).reduce(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {} as IColumns
    );

    actions.forEach((action) => {
      let statusName = STATUS_MAP[action.status];

      // Redistribuir atrasadas
      if (action.status === 4) {
        statusName = STATUS_MAP[1];
      }
      if (action.status === 5) {
        statusName = STATUS_MAP[2];
      }

      if (statusName) {
        initialData[statusName].push(action);
      }
    });

    return initialData;
  });

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

    // De "Executadas" ou "Desativadas"
    if (
      draggedFromColumn === STATUS_MAP[3] ||
      draggedFromColumn === STATUS_MAP[4]
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
                  <S.ColumnTitle>{status}</S.ColumnTitle>
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
