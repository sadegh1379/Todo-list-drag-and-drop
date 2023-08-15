import React, { useReducer } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reducer } from "../../reducer";
import Column from "../Column";

const initialBoards = [
  {
    id: 1,
    title: "Todo",
    bgColor: "bg-light-red",
    titleColor: "text-dark-red",
    tasks: [
      {
        id: 1,
        title:
          "Start with meditation, exercise & breakfast for a productive day",
        status: "todo",
      },
      {
        id: 2,
        title: "Read to learn something new every day",
        complete: "doing",
      },
      {
        id: 3,
        title: "Read to learn something new every day",
        complete: "done",
      },
    ],
  },
  {
    id: 2,
    title: "Doing",
    bgColor: "bg-light-pink",
    titleColor: "text-dark-pink",
    tasks: [
      {
        id: 1,
        title:
          "Start with meditation, exercise & breakfast for a productive day",
        status: "todo",
      },
      {
        id: 2,
        title: "Read to learn something new every day",
        complete: "doing",
      },
      {
        id: 3,
        title: "Read to learn something new every day",
        complete: "done",
      },
    ],
  },
  {
    id: 3,
    title: "Done",
    bgColor: "bg-light-green",
    titleColor: "text-dark-green",
    tasks: [
      {
        id: 1,
        title:
          "Start with meditation, exercise & breakfast for a productive day",
        status: "todo",
      },
      {
        id: 2,
        title: "Read to learn something new every day",
        complete: "doing",
      },
      {
        id: 3,
        title: "Read to learn something new every day",
        complete: "done",
      },
    ],
  },
];
function Board() {
  const [boards, dispatch] = useReducer(reducer, initialBoards);

  const handleDropEnd = () => {};
  console.log(boards);
  return (
    <DragDropContext onDragEnd={handleDropEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boards.map((board, index) => (
              <Column
                title={board.title}
                bgColor={board.bgColor}
                titleColor={board.titleColor}
                id={board.id}
                key={board.id}
                index={index}
                tasks={board.tasks}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
