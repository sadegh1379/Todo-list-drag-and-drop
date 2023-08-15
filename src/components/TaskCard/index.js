import React from "react";
import { CiCircleRemove } from "react-icons/ci";

function TaskCard({
  task,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}) {
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white group rounded-[4px] border border-gray-100 p-4 m-0 flex flex-row items-center "
    >
      <div class="flex items-center justify-between w-full gap-1 relative">
        <input
          id="green-checkbox"
          type="checkbox"
          class="w-4 accent-dark-pink outline-none h-4 rounded focus:ring-dark-red focus:ring-0"
        />
        <label for="green-checkbox" class="text-sm flex-1 font-medium ml-1">
          Green adaw awda adwda awdawdawDoing
        </label>
        <button className="absolute right-[1px] hidden group-hover:flex ">
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
