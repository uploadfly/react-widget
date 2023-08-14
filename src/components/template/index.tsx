import { FC, ReactNode, useEffect, useState } from "react";
import Button from "../atom/button/Button";
import { useDropzone } from "react-dropzone";
import { FcImageFile } from "react-icons/fc";
import { BASE_URL } from "../../constant";
import { PiSealCheckFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcFile } from "react-icons/fc";
import UfModal from "../organism/modal/modal";
import axios from "axios";
import ErrorToast from "../molecule/notifications/errorToast";

interface IFly {
  children: ReactNode;
  apiKey: string;
}

const FlyUpload: FC<IFly> = ({ children, apiKey }) => {
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setSelectedFile(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  const postFile = async () => {
    if (selectedFile) {
      setLoading(true);
      console.log(apiKey);
      const formdata = new FormData();
      formdata.append("file", selectedFile);
      try {
        const response = await axios.post(`${BASE_URL}/upload`, formdata, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (response?.status === 201 || response?.status === 200) {
          return setMessage(true);
        }
      } catch (error) {
        const msg = error?.response?.data?.error;
        setError(msg);
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
  //hide error messga after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      error ? setError("") : "";
    }, 4000);
  }, [error]);

  return (
    <div className="my-4">
      <center>
        <UfModal isOpen={isOpen}>
          {!error || <ErrorToast message={error} />}
          <div className="py-3">
            {!message ? (
              <div className="flex cursor-pointer   h-[30vh] items-center gap-3 flex-col justify-center my-5">
                {message || (
                  <div {...getRootProps({ className: "dropzone " })}>
                    <input {...getInputProps()} />
                    <div>
                      <center>
                        <FcImageFile size={"4em"} />
                      </center>
                      <p className="my-2 text-gray-500">
                        Click to upload or Drag and Drop file
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
                      <div className="flex justify-between px-4 py-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div>
                            <FcFile />
                          </div>
                          <div>
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
                      <div className="flex justify-center my-4">
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
