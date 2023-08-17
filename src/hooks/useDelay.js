import React from "react";

function useDelay(delay) {
  const addDelay = (myFun) =>
    setTimeout(() => {
      myFun?.();
    }, delay);

  return [addDelay];
}

export default useDelay;
