import { v4 as uuidv4 } from "uuid";

function useTaskHandler(boards) {
  const deleteTask = (boardId, taskId) => {
    const editedTasks = boards[boardId].tasks.filter(
      (task) => task.id !== taskId
    );

    const newBoards = {
      ...boards,
      [boardId]: {
        ...boards[boardId],
        tasks: editedTasks,
      },
    };
    return newBoards;
  };

  const addTask = (boardId, title, multi = false) => {
    const newTask = {
      id: uuidv4(),
      title,
    };
    const newBoards = {
      ...boards,
      [boardId]: {
        ...boards[boardId],
        tasks: boards[boardId].tasks.concat([newTask]),
      },
    };
    return newBoards;
  };

  const addMultiTask = (boardId, tasks) => {
    const newTasks = tasks.map((task) => ({
      title: task,
      id: uuidv4(),
    }));
    const newBoards = {
      ...boards,
      [boardId]: {
        ...boards[boardId],
        tasks: boards[boardId].tasks.concat(newTasks),
      },
    };
    return newBoards;
  };

  return {
    deleteTask,
    addTask,
    addMultiTask,
  };
}

export default useTaskHandler;
