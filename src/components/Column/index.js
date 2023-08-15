import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from 'react-icons/ai';

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
            {/* tasks */}
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
                  {/* drag place holder */}
                  {provided.placeholder}
                  {/* add new task */}
                  <div>
                    <button className={`font-bold text-[13px] ${titleColor} opacity-60 flex items-center gap-2`}>
                      <AiOutlinePlus size={20}/>
                       New
                    </button>
                  </div>
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
