import Button from "../atom/button/Button";
import Modal from "../organism/modal/modal";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";

const IndexPage = () => {
  const onDropFile = useCallback((acceptCallback) => {
    console.log(acceptCallback);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone(onDropFile);

  return (
    <div className="my-4">
      <center>
        <Modal>
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            {isDragActive ? <p> droped file </p> : <p>Show item</p>}
          </div>
        </Modal>
        <Button>Upload Now</Button>
      </center>
    </div>
  );
};
export default IndexPage;
