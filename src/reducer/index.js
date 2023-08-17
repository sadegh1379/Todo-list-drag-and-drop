import { v4 as uuidv4 } from "uuid";

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOARD":
      return action.boards;

    case "ADD_TASK":
      const { title, boardId } = action;
      const newTask = {
        id: uuidv4(),
        toComplete: false,
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
        toComplete: false,
        id: uuidv4(),
      }));
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: state[action.boardId].tasks.concat(newTasks),
        },
      };

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

    case "EDIT_TASK":
      const editedTaskList = state[action.boardId].tasks.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            title: action.newTitle,
          };
        }
        return task;
      });
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: editedTaskList,
        },
      };

    case "EDIT_TASK_STATUS":
      const taskList = state[action.boardId].tasks.map((task) => {
        if (task.id === action.taskId) {
          return {
            ...task,
            toComplete: !task.toComplete,
          };
        }
        return task;
      });
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: taskList,
        },
      };

    case "MOVE_TASK_TO_DONE":
      const task = state[action.boardId].tasks.find(
        (task) => task.id === action.taskId
      );

      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: state[action.boardId].tasks.filter(
            (task) => task.id !== action.taskId
          ),
        },
        done: {
          ...state["done"],
          tasks: [task, ...state["done"].tasks],
        },
      };
    case "MOVE_TASK_TO_TODO":
      const taskItem = state[action.boardId].tasks.find(
        (task) => task.id === action.taskId
      );

      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: state[action.boardId].tasks.filter(
            (task) => task.id !== action.taskId
          ),
        },
        todo: {
          ...state["todo"],
          tasks: [taskItem, ...state["todo"].tasks],
        },
      };
    default:
      return state;
  }
};
