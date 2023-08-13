import { FC } from "react";
import { IButton } from "../../../interface";

const Button: FC<IButton> = ({ children, color, bgColor, ...props }) => {
  const ButtonStyle = {
    backgroundColor: bgColor || "var(--primary)",
    color: color || "black",
  };
  return (
    <button
      className={` rounded px-5 py-3 font-medium `}
      style={ButtonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
