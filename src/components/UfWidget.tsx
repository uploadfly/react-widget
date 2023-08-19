import { ReactNode, useRef, useState } from "react";
import { MdClose, MdUpload } from "react-icons/md";
import filesize from "file-size";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { BsCloudCheckFill, BsFillCloudSlashFill } from "react-icons/bs";

const UfWidget = ({
  children,
  buttonClasses,
  apiKey,
  hideAttribution,
}: {
  children: ReactNode;
  buttonClasses?: string;
  apiKey: string;
  hideAttribution?: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const inputRef: { current: any } = useRef(null);
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
  const [didUploadFail, setDidUploadFail] = useState<boolean>(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      await axios.post("https://api.uploadfly.cloud/upload", formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      setIsUploadSuccessful(true);
    } catch (error) {
      setDidUploadFail(true);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    if (uploading) return;
    setIsModalOpen(false);
    setFile(null);
    setDidUploadFail(false);
    setIsUploadSuccessful(false);
  };
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
            onClick={handleClose}
          >
            <div
              className="w-[500px] h-[400px] bg-white rounded-lg relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-2xl"
              >
                <MdClose />
              </button>
              <div className="w-full">
                <input
                  type="file"
                  ref={inputRef}
                  hidden={true}
                  multiple={false}
                  onChange={(e: any) => setFile(e.target.files[0])}
                />

                {!file && !didUploadFail && !isUploadSuccessful && (
                  <div className="w-full flex items-center justify-center flex-col">
                    <button
                      className={
                        buttonClasses
                          ? buttonClasses
                          : "bg-accent text-white font-semibold px-5 py-3 rounded-full"
                      }
                      onClick={() => inputRef.current.click()}
                    >
                      Choose a file
                    </button>
                    <p className="text-center mt-2 font-semibold">
                      ...or drop a file
                    </p>
                  </div>
                )}
                {file && !didUploadFail && !isUploadSuccessful && (
                  <div className="flex flex-col items-center w-full">
                    {!uploading && (
                      <button
                        className="underline mb-4 font-semibold"
                        onClick={() => inputRef.current.click()}
                      >
                        Change file
                      </button>
                    )}
                    <div className="flex flex-col items-start w-[90%]">
                      <p>
                        <span className="font-semibold">Name: </span>
                        {file.name}
                      </p>
                      <p>
                        <span className="font-semibold">Type: </span>
                        {file.type}
                      </p>
                      <p>
                        <span className="font-semibold">Size: </span>
                        {filesize(file.size).human("si")}
                      </p>
                    </div>
                    <button
                      className="flex items-center gap-2 border-4 transition-colors border-transparent hover:border-white/50 bg-accent text-white font-semibold px-7 py-2 rounded-full mt-5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:border-transparent"
                      disabled={uploading}
                      onClick={handleUpload}
                    >
                      {uploading ? (
                        <CgSpinner className="animate-spin" />
                      ) : (
                        <MdUpload />
                      )}
                      Upload{uploading && "ing..."}
                    </button>
                  </div>
                )}
                {didUploadFail && (
                  <div className="flex flex-col items-center gap-2">
                    <BsFillCloudSlashFill className="text-7xl text-red-600" />
                    <h2 className="font-semibold text-xl">
                      File upload failed
                    </h2>
                  </div>
                )}
                {isUploadSuccessful && (
                  <div className="flex flex-col items-center gap-2">
                    <BsCloudCheckFill className="text-7xl text-green-600" />
                    <h2 className="font-semibold text-xl">
                      File upload successful
                    </h2>
                  </div>
                )}
              </div>
              {!hideAttribution && (
                <p className="absolute bottom-3 text-sm text-gray-400 left-3">
                  Powered with ♥ by{" "}
                  <a
                    href="https://uploadfly.cloud?utm_source=react_widget"
                    target="_blank"
                    className="font-semibold hover:underline"
                  >
                    Uploadfly
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UfWidget;
