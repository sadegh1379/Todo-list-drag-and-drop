import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import AddTaskForm from "../Forms/AddTaskForm";
import TaskCard from "../TaskCard";
import { isEmpty } from "lodash";

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

function Column({
  id,
  tasks,
  index,
  title,
  bgColor,
  titleColor,
  icon,
  deleteTaskHandler,
  addTaskHandler,
  addMultiTaskHandler,
  editTaskHandler,
  editTaskStatusHandler,
  boardId,
  placeholderProps,
}) {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTaskId, setShowTaskId] = useState("");

  const showAddTaskHandelr = () => {
    setShowAddTask(true);
    setShowTaskId(boardId);
  };

  const submitTask = (title) => {
    addTaskHandler(boardId, title);
    setShowAddTask(false);
  };

  const submitMultiTask = (tasks) => {
    addMultiTaskHandler(boardId, tasks);
  };

  const submitEditedTask = (taskId, newTitle) => {
    editTaskHandler(boardId, taskId, newTitle)
  }

  return (
    <Draggable isDragDisabled draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={id} type="card">
            {/* tasks */}
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-4 rounded-lg shadow-sm relative
              ${snapshot.isDraggingOver ? bgColor : bgColor}

              `}
              >
                <h2 className="font-[600] text-[16px] flex justify-between">
                  <span className={`${titleColor}`}>
                    {title} {icon}
                  </span>
                  <span className={`${titleColor} text-[13px] opacity-30`}>
                    {tasks.length} Tasks
                  </span>
                </h2>
                <div className="space-y-3 my-3">
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TaskCard
                          task={task}
                          index={index}
                          id={task.id}
                          provided={provided}
                          snapshot={snapshot}
                          boardId={boardId}
                          deleteTaskHandler={deleteTaskHandler}
                          submitEditedTask={submitEditedTask}
                          editTaskStatus={editTaskStatusHandler}
                        />
                      )}
                    </Draggable>
                  ))}
                  {/* drag place holder */}
                  {provided.placeholder}
                  {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                    <div
                      className="absolute border-dashed mx-4 rounded-[4px] border border-gray-100"
                      style={{
                        top:  placeholderProps.clientY + 50,
                        left: placeholderProps.clientX,
                        height: placeholderProps.clientHeight,
                        width: placeholderProps.clientWidth,
                      }}
                    />
                  )}
                  {/* add new task */}
                  {boardId !== "done" && !showAddTask && (
                    <div>
                      <button
                        className={`font-bold text-[13px] ${titleColor} opacity-60 flex items-center gap-2`}
                        onClick={showAddTaskHandelr}
                      >
                        <AiOutlinePlus size={20} />
                        New
                      </button>
                    </div>
                  )}
                  {/* add task input form */}
                  {showAddTask && showTaskId === boardId && (
                    <AddTaskForm
                      onSubmit={submitTask}
                      onSubmitMulti={submitMultiTask}
                      cancel={() => setShowAddTask(false)}
                    />
                  )}
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
