export const initialBoards = {
  todo: {
    id: "todo",
    title: "Todo",
    bgColor: "bg-light-red",
    titleColor: "text-dark-red",
    icon: "",
    tasks: [
      {
        id: "1",
        toComplete: false,
        title:
          "Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "2",
        toComplete: false,
        title: "Read to learn something new every day",
      },
      {
        id: "3",
        toComplete: false,
        title: "Learn something fresh & relevant",
      },
    ],
  },
  doing: {
    id: "doing",
    title: "Doing",
    bgColor: "bg-light-pink",
    titleColor: "text-dark-pink",
    icon: "💪",
    tasks: [
      {
        id: "4",
        toComplete: false,
        title: "Engage & question in meetings",
      },
      {
        id: "5",
        toComplete: false,
        title: "Use time-blocking for effective days",
      },
    ],
  },
  done: {
    id: "done",
    title: "Done",
    bgColor: "bg-light-green",
    titleColor: "text-dark-green",
    icon: "🎉",
    tasks: [
      {
        id: "6",
        toComplete: true,
        title: "Finished online course - check!",
      },
      {
        id: "7",
        toComplete: true,
        title:
          "Congratulate yourself for incorporating healthier habits into your lifestyle, like regular exercise or mindful eating",
      },
    ],
  },
};
