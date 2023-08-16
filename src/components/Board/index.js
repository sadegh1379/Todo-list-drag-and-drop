import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../../helper/reorder";
import useDeleteTask from "../../hooks/useDeleteTask";
import { initialBoards } from "../../utils/Data";
import Column from "../Column";

function Board() {
  const [boards, setBoards] = useState(initialBoards);
  const [ordered, setOrdered] = useState(Object.keys(initialBoards));
  const [deleteTask] = useDeleteTask();

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

  const deleteTaskHandler = (boardId, taskId) => {
    setBoards(deleteTask(boards, boardId, taskId))
  }

  return (
    <DragDropContext onDragEnd={handleDropEnd} >
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
                boardId={boards[key].id}
                tasks={boards[key].tasks}
                icon={boards[key].icon}
                deleteTaskHandler={deleteTaskHandler}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
