export const CELL = {
  EMPTY: "empty",
  ORUGUITA: "oruguita",
  ORUGUITA_HEAD: "oruguita-head",
  CHERRY: "cherry",
};

export const getColor = (cell) => {
  switch (cell) {
    case CELL.ORUGUITA:
      return "bg-green-400";
    case CELL.ORUGUITA_HEAD:
      return "bg-pink-400";
    case CELL.CHERRY:
      return "bg-red-400";
    default:
      return "bg-white";
  }
};
