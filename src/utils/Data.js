export const initialBoards = {
  todo: {
    id: "todo",
    title: "Todo",
    bgColor: "bg-light-red",
    titleColor: "text-dark-red",
    icon: "",
    tasks: [
      {
        id: "20",
        toComplete: false,
        title:
          "1Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "21",
        toComplete: false,
        title: "2Read to learn something new every day",
      },
      {
        id: "22",
        toComplete: false,
        title: "3Read to learn something new every day",
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
        id: "23",
        toComplete: false,
        title:
          "4Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "24",
        toComplete: false,
        title: "5Read to learn something new every day",
      },
      {
        id: "25",
        toComplete: false,
        title: "6Read to learn something new every day",
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
        id: "26",
        toComplete: true,
        title:
          "7Start with meditation, exercise & breakfast for a productive day",
      },
      {
        id: "27",
        toComplete: true,
        title: "8Read to learn something new every day",
      },
      {
        id: "28",
        toComplete: true,
        title: "9Read to learn something new every day",
      },
    ],
  },
};