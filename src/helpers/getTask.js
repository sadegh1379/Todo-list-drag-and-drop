function getTask(boards, boardId, taskId) {
  return boards[boardId].tasks.find((task) => task.id === taskId);
}

export default getTask;
