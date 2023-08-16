import React, { useRef, useState } from "react";

function AddTaskForm({ onSubmit, cancel, onSubmitMulti }) {
  const textareaRef = useRef(null);
  const [title, setTitle] = useState("");

  const addTasks = (e) => {
    if (e.key === "Enter") {
      if (!title.length) return;
      const lines = title.split("\n");
      if (lines.length >= 2) {
        onSubmitMulti(lines.filter((text) => text !== ""));
      } else {
        onSubmit(lines[0]);
      }
      setTitle("");
    }
  };

  return (
    <div className="relative">
      <div
        onClick={cancel}
        className="absolute top-[32%] bottom-0 right-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 text-dark-red"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      <textarea
        autoFocus
        ref={textareaRef}
        className="bg-white w-full rounded-[4px] border border-gray-100 p-4 pr-6 m-0"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={addTasks}
      />
    </div>
  );
}

export default AddTaskForm;
