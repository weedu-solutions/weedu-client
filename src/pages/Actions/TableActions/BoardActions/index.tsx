import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import * as S from "../styles"; // Seu arquivo de estilos
import { BoxColor } from "../../../../components/BoxColor";
import IActions from "../../../../interfaces/actions";

const STATUS_MAP: { [key: number]: string } = {
  1: "A iniciar",
  2: "Em execução",
  3: "Executadas",
  4: "Atrasadas a iniciar",
  5: "Atrasadas a terminar",
};

interface IAction {
  id: number;
  status: number;
  what: string;
  who: string;
  is_active: number;
  preview_init_date: string;
}

interface IColumns {
  [key: string]: IAction[];
}

interface IBoardActions {
  setIsModalDisableAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalStartAction: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModalSeeDetails: React.Dispatch<React.SetStateAction<boolean>>;
  actions: IAction[];
  setActionInfo: React.Dispatch<React.SetStateAction<IActions | undefined>>;
  refetchAllActions: () => void;
}

export function BoardActions({
  actions,
  setActionInfo,
  setIsModalDisableAction,
  setIsModalSeeDetails,
  setIsModalStartAction,
  refetchAllActions
}: IBoardActions) {
  console.log(actions)
  const STATUS_MAP: { [key: number]: string } = {
    1: "A iniciar",
    2: "Em execução",
    3: "Executadas",
    4: "Desativadas"
  };

  const [columns, setColumns] = React.useState<IColumns>(() => {
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
      if (action.is_active === 0) {
        statusName = STATUS_MAP[4];
      }

      if (statusName) {
        initialData[statusName].push(action);
      }
    });

    return initialData;
  });

  const [pendingAction, setPendingAction] = React.useState<IAction | null>(null);
  const [dragResult, setDragResult] = React.useState<{ source: any; destination: any } | null>(
    null
  );

  const confirmModal = React.useCallback(() => {
    if (!pendingAction || !dragResult) return;

    const { source, destination } = dragResult;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedAction] = sourceCol.splice(source.index, 1);

    // Atualiza o status baseado na coluna de destino
    movedAction.status = Object.keys(STATUS_MAP).find(
      (key) => STATUS_MAP[Number(key)] === destination.droppableId
    ) as unknown as number;

    destCol.splice(destination.index, 0, movedAction);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });

    // Limpar estados temporários
    setPendingAction(null);
    setDragResult(null);
  }, [columns, dragResult, pendingAction]);

  const cancelModal = React.useCallback(() => {
    // Reverter o card para a coluna de origem
    if (!dragResult) return;

    const { source } = dragResult;
    const sourceCol = [...columns[source.droppableId]];

    if (pendingAction) {
      sourceCol.splice(source.index, 0, pendingAction);
      setColumns({
        ...columns,
        [source.droppableId]: sourceCol,
      });
    }

    // Limpar estados temporários
    setPendingAction(null);
    setDragResult(null);
  }, [columns, dragResult, pendingAction]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    // Verificar movimento de "A iniciar" para "Em execução"
    if (source.droppableId === STATUS_MAP[1] && destination.droppableId === STATUS_MAP[2]) {
      const sourceCol = [...columns[source.droppableId]];
      const [movedAction] = sourceCol.splice(source.index, 1);

      // Salvar ação pendente e drag result temporário
      setPendingAction(movedAction);
      setDragResult({ source, destination });

      // Abrir modal para iniciar ação
      handleOpenModalStartAction(movedAction);
      return;
    }

    // Verificar movimento de "Em execução" para "Executadas"
    if (source.droppableId === STATUS_MAP[2] && destination.droppableId === STATUS_MAP[3]) {
      const sourceCol = [...columns[source.droppableId]];
      const [movedAction] = sourceCol.splice(source.index, 1);

      // Salvar ação pendente e drag result temporário
      setPendingAction(movedAction);
      setDragResult({ source, destination });

      // Abrir modal para concluir ação
      handleOpenModalStartAction(movedAction);
      return;
    }

    // Atualizar o estado normalmente se não for um movimento especial
    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedAction] = sourceCol.splice(source.index, 1);

    // Atualiza o status baseado na coluna de destino
    movedAction.status = Object.keys(STATUS_MAP).find(
      (key) => STATUS_MAP[Number(key)] === destination.droppableId
    ) as unknown as number;

    destCol.splice(destination.index, 0, movedAction);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  function handleOpenModalStartAction(action: IAction) {
    setIsModalStartAction(true);
    setActionInfo(action);
  }

  function handleOpenModalSeeDetails(action: IAction) {
    setIsModalSeeDetails(true);
    setActionInfo(action);
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <S.BoardContainer>
          {Object.values(STATUS_MAP).map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <S.Column ref={provided.innerRef} {...provided.droppableProps}>
                  <S.ColumnTitle>{status}</S.ColumnTitle>
                  {columns[status].map((action, index) => (
                    <Draggable
                      key={action.id.toString()}
                      draggableId={action.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <S.Card
                          onClick={() => handleOpenModalSeeDetails(action)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <S.CardHeader>
                            <BoxColor status={action.status} rowInfo={action} />
                          </S.CardHeader>
                          <S.CardContent>
                            <S.CardTitle>{action.what}</S.CardTitle>
                            <S.CardInfo>
                              <S.CardInfoItem>
                                <S.IconWrapper>👤</S.IconWrapper>
                                {action.who}
                              </S.CardInfoItem>
                              <S.CardInfoItem>
                                <S.IconWrapper>📅</S.IconWrapper>
                                Data de início: {action.preview_init_date}
                              </S.CardInfoItem>
                            </S.CardInfo>
                          </S.CardContent>
                        </S.Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </S.Column>
              )}
            </Droppable>
          ))}
        </S.BoardContainer>
      </DragDropContext>
    </>
  );
}
