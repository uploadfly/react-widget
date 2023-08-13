import { FC, ReactNode, useEffect, useState } from "react";
import Button from "../atom/button/Button";
import { useDropzone } from "react-dropzone";
import { FcImageFile } from "react-icons/fc";
import { AUTHENTICATE, BASE_URL } from "../../constant";
import { PiSealCheckFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcFile } from "react-icons/fc";
import UfModal from "../organism/modal/modal";

interface IFly {
  children: ReactNode;
}

const FlyUpload: FC<IFly> = ({ children }) => {
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState<boolean>(false);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setSelectedFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  // Function to handle file upload
  const postFile = async () => {
    if (selectedFile) {
      setLoading(true);

      const formdata = new FormData();
      formdata.append("file", selectedFile);
      try {
        const response = await fetch(`${BASE_URL}/upload`, {
          method: "POST",
          body: formdata,
          headers: {
            Authorization: AUTHENTICATE,
          },
        });

        if (response?.status === 201 || response?.status === 200) {
          return setMessage(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const reUploadfile = () => setMessage(false);

  const uploaded = (
    <div className=" gap-4 flex align-middle my-[3em] flex-col items-center justify-center">
      <PiSealCheckFill size={"7em"} color="green" />
      <p className="text-gray">File has been uploaded successfully</p>
      <Button bgColor="#80808021" onClick={reUploadfile}>
        Upload File
      </Button>
    </div>
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="my-4">
      <center>
        <UfModal isOpen={isOpen}>
          <div className="py-3">
            {!message ? (
              <div className="flex cursor-pointer   h-[30vh] items-center gap-3 flex-col justify-center my-5">
                {/* Dropzone area */}

                {message || (
                  <div {...getRootProps({ className: "dropzone " })}>
                    <input {...getInputProps()} />
                    <div>
                      <center>
                        <FcImageFile size={"4em"} />
                      </center>
                      <p className="my-2 text-gray-500">
                        Click to upload or Drag and Drop file{" "}
                      </p>
                    </div>
                  </div>
                )}

                <div className=" w-[80%]">
                  {selectedFile && (
                    <div
                      style={{
                        width: "100% !important",
                      }}
                    >
                      <div className="border flex justify-between  py-4 px-4 rounded-md">
                        <div className="flex items-center gap-3">
                          <div>
                            <FcFile />
                          </div>
                          <div>
                            {/* eslint-disable-next-line */}
                            {/* @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <p className="font-bold">{selectedFile?.name}</p>
                            <small>{selectedFile?.size} bytes</small>
                          </div>
                        </div>
                        <div className=" w-[fit-content] p-3 rounded-full h-[fit-content] bg-lightRed">
                          <RiDeleteBin6Line color="red" />
                        </div>
                      </div>

                      {loading && (
                        <progress
                          value={"10"}
                          max={"100"}
                          className="w-[100%] my-2 rounded-md"
                        ></progress>
                      )}
                      <div className="my-4 flex justify-center">
                        <Button onClick={postFile}>
                          {loading ? "Uploading file..." : "Upload File"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>{uploaded}</div>
            )}
          </div>
        </UfModal>
      </center>

      <div onClick={() => setIsOpen(true)}>{children}</div>
    </div>
  );
};

export default FlyUpload;
