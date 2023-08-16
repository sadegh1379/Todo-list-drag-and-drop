import React from 'react'

function useDeleteTask() {

  const deleteTask = (boards, boardId, taskId) => {
    const editedTasks = boards[boardId].tasks.filter(task => task.id !== taskId);

    const newBoards = {
      ...boards,
      [boardId]: {
        ...boards[boardId],
        tasks: editedTasks
      }
    }
    return newBoards;
  }
  
  return [
    deleteTask
  ]
}

export default useDeleteTask
