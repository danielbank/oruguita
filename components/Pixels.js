import { getColor } from "../utils/constants";

export const Pixel = ({ cell, ...props }) => {
  return <div className={`h-8 w-8 m-1 ${getColor(cell)}`} {...props} />;
};

export const PixelRow = ({ ...props }) => {
  return <div className="flex" {...props} />;
};
