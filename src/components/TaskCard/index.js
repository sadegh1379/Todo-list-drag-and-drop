import React from "react";

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
      className="bg-white rounded-md space-y-5 p-5 drop-shadow-md"
    >
      task card
    </div>
  );
}

export default TaskCard;
