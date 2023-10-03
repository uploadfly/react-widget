import { ReactNode } from "react";

/**
 * Interface describing the properties accepted by the UfWidget component.
 */
interface WidgetProps {
  /**
   * The content to be displayed within the widget. It can be any valid React node.
   * @example <button className="upload_btn">Upload File</button>
   */
  children: ReactNode;

  /**
   * The API key required for authentication to upload files to your UploadFly "fly".
   * @example "uf_69*******************420*************"
   */
  apiKey: string;

  /**
   * The desired filename for the uploaded file. Optional.
   * @example "awesome-video.mp4"
   */
  filename?: string;

  /**
   * The maximum allowed file size for upload, specified as a string. Optional.
   * @example "6.9MB"
   */
  maxFileSize?: string;

  /**
   * An array of allowed file types for upload. Optional.
   * @example ["jpeg", "png"]
   */
  allowedFileTypes?: string[];

  /**
   * A boolean flag to hide the attribution link. Optional.
   * @example true
   */
  hideAttribution?: boolean;

  /**
   * A callback function triggered when the file upload is complete.
   * It provides information about the uploaded file. Optional.
   * @example
   * (data) => {
   *   console.log(data);
   *   // Handle the uploaded file data
   * }
   */
  onUploadComplete?: (data: {
    status: number;
    success: boolean;
    data: {
      url: string;
      name: string;
      size: number;
      type: string;
      path: string;
    };
  }) => void;

  /**
   * The accent color for the widget, specified as a hexadecimal color code. Optional.
   * @example "#ff5733"
   */
  accentColor?: string;
}

export default WidgetProps;
