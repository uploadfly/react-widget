import { ReactNode, useRef, useState } from "react";
import { MdClose } from "react-icons/md";

const UfWidget = ({
  children,
  buttonClasses,
  buttonText,
}: {
  children: ReactNode;
  buttonClasses?: string;
  buttonText?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const inputRef: { current: any } = useRef(null);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="absolute">
        {children}
      </div>
      <div
        className={`relative w-full h-screen z-50 ${
          !isModalOpen ? "pointer-events-none" : ""
        }`}
      >
        {isModalOpen && (
          <div
            className="w-full bg-black/20 backdrop-blur-lg top-0 absolute h-screen flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="w-[500px] h-[500px] bg-white rounded-lg relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 text-2xl"
              >
                <MdClose />
              </button>
              <div className="">
                <input
                  type="file"
                  ref={inputRef}
                  hidden={true}
                  multiple={false}
                />
                <button
                  className={
                    buttonClasses
                      ? buttonClasses
                      : "bg-accent text-white font-semibold px-5 py-3 rounded-full"
                  }
                  onClick={() => inputRef.current.click()}
                >
                  {buttonText ? buttonText : "Upload a file"}
                </button>
                <p className="text-center mt-3 font-semibold">
                  ...or drop a file
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UfWidget;
