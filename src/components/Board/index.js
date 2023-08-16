import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../../helpers/reorder";
import useTaskHandler from "../../hooks/useTaskHandler";
import { initialBoards } from "../../utils/Data";
import Column from "../Column";

function Board() {
  const [boards, setBoards] = useState(initialBoards);
  const [ordered, setOrdered] = useState(Object.keys(initialBoards));
  const { deleteTask, addTask, addMultiTask } = useTaskHandler(boards);

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
    setBoards(deleteTask(boardId, taskId))
  }

  const addTaskHandler = (boardId, title) => {
    setBoards(addTask(boardId, title))
  };

  const addMultiTaskHandler = (boardId, tasks) =>{
    setBoards(addMultiTask(boardId, tasks))
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
                addTaskHandler={addTaskHandler}
                addMultiTaskHandler={addMultiTaskHandler}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
