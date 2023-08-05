import Button from "../atom/button/Button";
import Modal from "../organism/modal/modal";

const IndexPage = () => {
  return (
    <div className="my-4">
      <center>
        <Modal>
          <div className="text-center">
            Click to upload
            <center>
              <Button>Upload</Button>
            </center>
          </div>
        </Modal>
        <Button>Upload Now</Button>
      </center>
    </div>
  );
};
export default IndexPage;
