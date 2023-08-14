import React, { FC, useState } from "react";
import { createPortal } from "react-dom";
import { IModal } from "../../../interface";

const UfModal: FC<IModal> = ({ children, isOpen }) => {
  const [open, setOpen] = useState<boolean>(false);

  const closeModal = () => {
    setOpen(false);
  };

  const modalContent = (
    <div className="fixed top-0 bottom-0 left-0 right-0 align bg-transBlack">
      <div className="my-[2em]  relative z-50 w-[90%] sm:w-[500px] py-5 px-5 rounded-lg bg-white mx-auto">
        <h1
          className="font-medium text-[1.5em] flex justify-end cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </h1>
        {children}
      </div>
    </div>
  );

  return (
    <>
      {isOpen ? open || <>{createPortal(modalContent, document.body)}</> : ""}
    </>
  );
};

export default UfModal;
