import { v4 as uuidv4 } from "uuid";

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOARD':
      console.log('action boards', action.boards);
      return action.boards;

    case "ADD_TASK":
      const { title, boardId } = action;
      const newTask = {
        id: uuidv4(),
        title,
      };

      return {
        ...state,
        [boardId]: {
          ...state[boardId],
          tasks: state[boardId].tasks.concat([newTask]),
        },
      };
      case "ADD_MULTI_TASK":
        const newTasks = action.tasks.map((task) => ({
          title: task,
          id: uuidv4(),
        }));
        return{
          ...state,
          [action.boardId]: {
            ...state[action.boardId],
            tasks: state[action.boardId].tasks.concat(newTasks),
          },
        }
    case "DELETE_TASK":
      const editedTasks = state[action.boardId].tasks.filter(
        (task) => task.id !== action.taskId
      );
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: editedTasks,
        },
      };
    default:
      return state;
  }
};
