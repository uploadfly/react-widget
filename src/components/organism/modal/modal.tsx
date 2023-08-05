import { FC } from "react";
import { createPortal } from "react-dom";
import { IModal } from "../../../interface";

const Modal: FC<IModal> = ({ children }) => {
  const modalContent = (
    <div className="fixed top-0 bottom-0 left-0 right-0 align bg-transBlack ">
      <div className=" my-[4em] h-[350px] relative z-50  w-[90%] sm:w-[500px] py-5 px-5 rounded-lg bg-white mx-auto">
        {children}
      </div>
    </div>
  );
  return <div>{createPortal(modalContent, document.body)}</div>;
};

export default Modal;
