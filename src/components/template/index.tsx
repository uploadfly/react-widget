import { useEffect, useState } from "react";
import Button from "../atom/button/Button";
import Modal from "../organism/modal/modal";
import { useDropzone } from "react-dropzone";
import { FcImageFile } from "react-icons/fc";
import { AUTHENTICATE, BASE_URL } from "../../constant";
import { PiSealCheckFill } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcFile } from "react-icons/fc";

const IndexPage = () => {
  const { acceptedFiles, getInputProps, getRootProps } = useDropzone();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState<boolean>(false);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
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
          setMessage(true);
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
    <div className="h-50vh gap-4 flex align-middle my-[3em] flex-col items-center justify-center">
      <PiSealCheckFill size={"7em"} color="green" />
      <p className="text-gray">File has been uploaded successfully</p>
      <Button bgColor="#80808021" onClick={reUploadfile}>
        {" "}
        Upload File
      </Button>
    </div>
  );

  return (
    <div className="my-4">
      <center>
        <Modal>
          {!message ? (
            <div className="flex cursor-pointer border border-dashed  h-[30vh] items-center gap-3 items-center flex-col justify-center my-5">
              {/* Dropzone area */}
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <div>
                  <center>
                    <FcImageFile size={"4em"} />
                  </center>
                </div>
              </div>

              <div>
                {selectedFile && (
                  <div>
                    <div className="border flex justify-between w-[100%] py-4 px-4 rounded-md">
                      <div className="flex items-center gap-3">
                        <div>
                          <FcFile />
                        </div>
                        <div>
                          <p className="font-bold">{selectedFile?.name}</p>
                          <small>{selectedFile?.size} bytes</small>
                        </div>
                      </div>
                      <div className=" w-[fit-content] p-2 rounded-full h-50 bg-lightRed">
                        <RiDeleteBin6Line color="red" />
                      </div>
                    </div>

                    {loading && <progress value={"10"} max={"100"}></progress>}
                    <div className="my-4">
                      <Button onClick={postFile}>Upload File</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>{uploaded}</>
          )}
        </Modal>
        <Button>Upload Now</Button>
      </center>
    </div>
  );
};

export default IndexPage;
