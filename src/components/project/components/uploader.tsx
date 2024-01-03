import React, { useEffect, useState } from "react";

import "./style.css";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import axios from "axios";
import { Button } from "@/components/ui/button";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FileInfo {
  name: string;
  size: number;
  type: string;
  // Add more properties as needed
}

const FileUploader: React.FC = () => {
  const [files, setFiles] = useState<FilePondFile[]>([]);

  const handleUpload = () => {
    // Make Axios POST request here
    axios.post("/api/upload", { files: files }).then((response) => {
      console.log("Files uploaded successfully:", response.data);
      // Optionally, you can reset the files array after successful upload
      setFiles([]);
    });
  };

  useEffect(() => {
    // Extract relevant information from each file
    const fileInfo: FileInfo[] = files.map((file) => ({
      name: file.filename || "", // Check if filename is available
      size: file.fileSize || 0,
      type: file.fileType || "",
      // Add more properties as needed
    }));

    console.log(fileInfo);
  }, [files]);

  return (
    <div>
      <div className="filepond">
        <FilePond
          files={files}
          onupdatefiles={setFiles}
          allowMultiple={true}
          maxFiles={5}
          name="files"
          allowImagePreview={false}
          imagePreviewMaxHeight={100}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </div>
      <div className="upload-btn">
        <Button variant="outline" size="sm" onClick={handleUpload}>
          Upload Files
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
