import React, { ReactNode , HTMLAttributes } from "react";

//button interface 
export interface IButton extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    bgColor?: string;
    color?: string;
    type?: "submit" | "reset" | "button";
    onClick?: ( Event: React.MouseEvent<HTMLButtonElement>) => void;
  }

  //modal interface 
  export interface IModal {
    isOpen?: boolean;
    onClose?: boolean;
    onOpen?: boolean;
    children?: ReactNode
  }