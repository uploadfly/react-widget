import { ReactNode, useRef, useState } from "react";
import { MdClose, MdUpload } from "react-icons/md";
import filesize from "file-size";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { BsCloudCheckFill, BsFillCloudSlashFill } from "react-icons/bs";
import "./style.css";
const UfWidget = ({
  children,
  apiKey,
  hideAttribution,
  onUploadComplete,
  accentColor = "#f35815",
}: {
  children: ReactNode;
  apiKey: string;
  hideAttribution?: boolean;
  onUploadComplete?: () => void;
  accentColor?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      onUploadComplete && onUploadComplete();
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
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  return (
    <div
      className="uf_widget_container"
      style={{ "--accent": accentColor } as any}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const droppedFile = e.dataTransfer.files[0];
        setFile(droppedFile);
      }}
    >
      <div onClick={() => setIsModalOpen(true)}>{children}</div>
      {isModalOpen && (
        <div
          className="uf_widget_modal"
          style={{
            pointerEvents: isModalOpen ? "auto" : "none",
          }}
        >
          <div className="uf_modal_backdrop rounded-md" onClick={handleClose}>
            <div
              className={`uf_modal_container ${
                isDraggingOver ? "drag-over" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={handleClose} className="uf_close_button">
                <MdClose />
              </button>
              <div
                style={{
                  width: "100%",
                }}
              >
                <input
                  type="file"
                  ref={inputRef}
                  hidden={true}
                  multiple={false}
                  onChange={(e: any) => setFile(e.target.files[0])}
                />

                {!file && !didUploadFail && !isUploadSuccessful && (
                  <div className="uf_choose_a_file">
                    <button
                      className="uf_choose_a_file_btn"
                      onClick={() => inputRef.current.click()}
                    >
                      Choose a file
                    </button>
                    <p className="uf_choose_a_file_text">...or drop a file</p>
                  </div>
                )}
                {file && !didUploadFail && !isUploadSuccessful && (
                  <div className="uf_file_selected">
                    {/* <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="rounded-md"
                    /> */}

                    {!uploading && (
                      <button
                        className="uf_change_file"
                        onClick={() => inputRef.current.click()}
                      >
                        Change file
                      </button>
                    )}
                    <div className="uf_file_info">
                      <p>
                        <span>Name: </span>
                        {file.name}
                      </p>
                      <p>
                        <span>Type: </span>
                        {file.type}
                      </p>
                      <p>
                        <span>Size: </span>
                        {filesize(file.size).human("si")}
                      </p>
                    </div>
                    <button
                      className="uf_upload_button"
                      disabled={uploading}
                      onClick={handleUpload}
                    >
                      {uploading ? (
                        <CgSpinner className="uf_animate_spin" />
                      ) : (
                        <MdUpload />
                      )}
                      Upload{uploading && "ing..."}
                    </button>
                  </div>
                )}
                {didUploadFail && (
                  <div className="uf_file_upload_response">
                    <BsFillCloudSlashFill
                      style={{
                        color: "rgb(220, 38, 38)",
                        fontSize: "4.5rem",
                        lineHeight: 1,
                      }}
                    />
                    <h2 className="">File upload failed</h2>
                  </div>
                )}
                {isUploadSuccessful && (
                  <div className="uf_file_upload_response">
                    <BsCloudCheckFill
                      style={{
                        color: "rgb(22, 163, 74)",
                        fontSize: "4.5rem",
                        lineHeight: 1,
                      }}
                    />
                    <h2>File upload successful</h2>
                  </div>
                )}
              </div>
              {!hideAttribution && (
                <p className="uf_attribution">
                  Powered with ♥ by{" "}
                  <a
                    href="https://uploadfly.co?utm_source=react_widget"
                    target="_blank"
                  >
                    Uploadfly
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UfWidget;
