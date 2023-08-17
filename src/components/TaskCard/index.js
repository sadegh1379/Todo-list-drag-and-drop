import React from "react";
import { EditTextarea } from "react-edit-text";
import { getTaskAnimationStyle } from "../../utils/getTaskAnimationStyle";

function TaskCard({
  task,
  id,
  deleteTaskHandler,
  submitEditedTask,
  editTaskStatus,
  boardId,
  provided,
  snapshot,
}) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      className={`group rounded-[4px] border border-gray-100 p-4 m-0 flex flex-row items-center
      ${snapshot.isDragging ? "bg-white" : "bg-white"}`}
      style={getTaskAnimationStyle(provided.draggableProps.style, snapshot)}
    >
      <div className="flex items-center justify-between w-full gap-2 relative pr-6">
        <input
          id="green-checkbox"
          type="checkbox"
          checked={task.toComplete}
          onChange={() => editTaskStatus(boardId, id)}
          className="w-4 h-4 accent-dark-pink outline-none rounded focus:ring-dark-red focus:ring-0"
        />
        <div className="flex-1">
          <EditTextarea
            className={`text-sm flex-1 font-medium ml-0 scrollbar-hide text-edit 
              ${boardId === "done" && "line-through"}
              `}
            style={{ width: "100%" }}
            rows={1}
            inputClassName="text-sm flex-1 font-medium"
            name="textbox2"
            defaultValue={task.title}
            onSave={(result) => submitEditedTask(id, result.value)}
          />
        </div>
        <button
          onClick={() => deleteTaskHandler(boardId, id)}
          className="absolute right-[1px] hidden group-hover:flex "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-dark-pink"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
