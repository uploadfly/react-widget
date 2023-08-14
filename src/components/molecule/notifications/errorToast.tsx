import { FC } from "react";

interface IErrorToast {
  message: string;
}

const ErrorToast: FC<IErrorToast> = ({ message }) => {
  return (
    <div className="px-3 py-4 rounded-md bg-lightRed">
      <p className="font-bold text-center text-red-500">{message}</p>
    </div>
  );
};
export default ErrorToast;
