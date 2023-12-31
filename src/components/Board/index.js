import React, { useReducer, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../../helpers/reorder";
import { reducer } from "../../reducer";
import { initialBoards } from "../../utils/Data";
import Column from "../Column";
import getTask from "../../helpers/getTask";
import useDelay from "../../hooks/useDelay";

const initialState = window.localStorage.getItem("boards")
  ? JSON.parse(localStorage.getItem("boards"))
  : initialBoards;

function Board() {
  const [boards, dispatch] = useReducer(reducer, initialState);
  const [delay] = useDelay(3000); // delay time (ms)
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
    dispatch({
      type: "ADD_BOARD",
      boards: data.quoteMap,
    });
  };

  const deleteTaskHandler = (boardId, taskId) => {
    dispatch({
      type: "DELETE_TASK",
      taskId,
      boardId,
    });
  };

  const addTaskHandler = (boardId, title) => {
    dispatch({
      type: "ADD_TASK",
      title,
      boardId,
    });
  };

  const addMultiTaskHandler = (boardId, tasks) => {
    dispatch({
      type: "ADD_MULTI_TASK",
      tasks,
      boardId,
    });
  };

  const editTaskHandler = (boardId, taskId, newTitle) => {
    dispatch({
      type: "EDIT_TASK",
      taskId,
      boardId,
      newTitle,
    });
  };

  const editTaskStatusHandler = (boardId, taskId) => {
    dispatch({
      type: "EDIT_TASK_STATUS",
      taskId,
      boardId,
    });

    if (!getTask(boards, boardId, taskId)?.toComplete) {
      delay(() => {
        dispatch({
          type: "MOVE_TASK_TO_DONE",
          taskId,
          boardId,
        });
      });
    } else {
      delay(() => {
        dispatch({
          type: "MOVE_TASK_TO_TODO",
          taskId,
          boardId,
        });
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDropEnd} >
      <Droppable droppableId="board" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mt-10 relative"
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
                editTaskHandler={editTaskHandler}
                editTaskStatusHandler={editTaskStatusHandler}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
