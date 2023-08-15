import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard";

function Column({ id, tasks, index, title, bgColor, titleColor }) {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm 
              ${snapshot.isDraggingOver ? bgColor : bgColor}

              `}
              >
                <h2 className="font-[600] text-[16px] flex justify-between">
                  <span className={`${titleColor}`}>{title}</span>
                  <span className={`${titleColor} opacity-30`}>
                    {tasks.length} Tasks
                  </span>
                </h2>
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard
                          task={task}
                          index={index}
                          id={task.id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
