export const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_BOARD":
      console.log('action new board', action);
      return action.newBoard;
    default:
      return state;
  }
};