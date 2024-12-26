import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import * as S from "../styles"; // Seu arquivo de estilos
import { BoxColor } from "../../../../components/BoxColor";

// Mapeamento dos status numéricos para os nomes
const STATUS_MAP: { [key: number]: string } = {
  1: "A iniciar",
  2: "Em execução",
  3: "Executadas",
  4: "Atrasadas a iniciar",
  5: "Atrasadas a terminar",
};

interface IAction {
  id: number;
  status: number; // Agora os status são números
  what: string;
  who: string;
  preview_init_date: string;
}

interface IColumns {
  [key: string]: IAction[]; // As chaves são os nomes dos status
}

export function BoardActions({ actions }: { actions: IAction[] }) {
  const [columns, setColumns] = React.useState<IColumns>(() => {
    const initialData: IColumns = Object.values(STATUS_MAP).reduce(
      (acc, status) => {
        acc[status] = [];
        return acc;
      },
      {} as IColumns
    );

    actions.forEach((action) => {
      const statusName = STATUS_MAP[action.status];
      if (statusName) {
        initialData[statusName].push(action);
      }
    });

    return initialData;
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Verifique se o destino é válido
    if (!destination) return;

    const sourceCol = [...columns[source.droppableId]];
    const destCol = [...columns[destination.droppableId]];
    const [movedAction] = sourceCol.splice(source.index, 1);

    // Adicione ao destino
    destCol.splice(destination.index, 0, movedAction);

    setColumns({
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  return (
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
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <BoxColor status={action.status} rowInfo={action} />
                        <p>
                          <strong>{action.what}</strong>
                        </p>
                        <p>Responsável: {action.who}</p>
                        <p>Início: {action.preview_init_date}</p>
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
  );
}
