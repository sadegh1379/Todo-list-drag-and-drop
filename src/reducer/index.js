import React from "react";
import { v4 as uuidv4 } from "uuid";

const addToLocalStorage = (valueToStore) => {
  window.localStorage.setItem('boards', JSON.stringify(valueToStore));
};

export const reducer = (state, action) => {
  let newBoard = {};
  switch (action.type) {
    case "ADD_BOARD":
      addToLocalStorage(action.boards);
      return action.boards;

    case "ADD_TASK":
      const { title, boardId } = action;
      const newTask = {
        id: uuidv4(),
        toComplete: false,
        title,
      };
      newBoard = {
        ...state,
        [boardId]: {
          ...state[boardId],
          tasks: state[boardId].tasks.concat([newTask]),
        },
      };
      addToLocalStorage(newBoard);
      return newBoard;

    case "ADD_MULTI_TASK":
      const newTasks = action.tasks.map((task) => ({
        title: task,
        toComplete: false,
        id: uuidv4(),
      }));
      newBoard = {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: state[action.boardId].tasks.concat(newTasks),
        },
      };
      addToLocalStorage(newBoard);
      return newBoard;

    case "DELETE_TASK":
      const editedTasks = state[action.boardId].tasks.filter(
        (task) => task.id !== action.taskId
      );
      newBoard = {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: editedTasks,
        },
      };
      addToLocalStorage(newBoard);
      return newBoard;

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
      newBoard = {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: editedTaskList,
        },
      };
      addToLocalStorage(newBoard);
      return newBoard;

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
      newBoard = {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          tasks: taskList,
        },
      };
      addToLocalStorage(newBoard);
      return newBoard;

    case "MOVE_TASK_TO_DONE":
      const task = state[action.boardId].tasks.find(
        (task) => task.id === action.taskId
      );
      newBoard = {
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
      addToLocalStorage(newBoard);
      return newBoard;
    case "MOVE_TASK_TO_TODO":
      const taskItem = state[action.boardId].tasks.find(
        (task) => task.id === action.taskId
      );

      newBoard = {
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
      addToLocalStorage(newBoard);
      return newBoard;
    default:
      return state;
  }
};
