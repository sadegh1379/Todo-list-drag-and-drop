import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../../utils/reorder";
import Column from "../Column";

const initialBoards = {
  todo: {
    id: "todo",
    title: "Todo",
    bgColor: "bg-light-red",
    titleColor: "text-dark-red",
    icon: "",
    tasks: [
      {
        id: "20",
        title:
          "1Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "21",
        title: "2Read to learn something new every day",
      },
      {
        id: "22",
        title: "3Read to learn something new every day",
      },
    ],
  },
  doing: {
    id: "doing",
    title: "Doing",
    bgColor: "bg-light-pink",
    titleColor: "text-dark-pink",
    icon: "💪",
    tasks: [
      {
        id: "23",
        title:
          "4Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "24",
        title: "5Read to learn something new every day",
      },
      {
        id: "25",
        title: "6Read to learn something new every day",
      },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    bgColor: "bg-light-green",
    titleColor: "text-dark-green",
    icon: "🎉",
    tasks: [
      {
        id: "26",
        title:
          "7Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "27",
        title: "8Read to learn something new every day",
      },
      {
        id: "28",
        title: "9Read to learn something new every day",
      },
    ],
  },
};

function Board() {
  const [boards, setBoards] = useState(initialBoards);
  const [ordered, setOrdered] = useState(Object.keys(initialBoards));

  const handleDropEnd = (result) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);

      setOrdered(reorderedorder);

      return;
    }
    const data = reorderQuoteMap({
      quoteMap: boards,
      source,
      destination,
    });

    setBoards(data.quoteMap);
  };

  return (
    <DragDropContext onDragEnd={handleDropEnd}>
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mt-10"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Column
                title={boards[key].title}
                bgColor={boards[key].bgColor}
                titleColor={boards[key].titleColor}
                id={key}
                key={boards[key].id}
                index={index}
                tasks={boards[key].tasks}
                icon={boards[key].icon}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
