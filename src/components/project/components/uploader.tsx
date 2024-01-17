import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import { useParams } from "react-router-dom"; 

import "./style.css";
import { FilePond, registerPlugin } from "react-filepond";
import { FilePondFile } from "filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import axios from "axios";
import { Button } from "@/components/ui/button";

// Import or define RootState and FileInfo
import { RootState } from "path/to/your/rootState";
import { FileInfo } from "path/to/your/fileInfo";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface File {
  id: string;
  filename: string;
  fileSize: number;
  fileType: string;
  file: Blob;
}


const FileUploader: React.FC = () => {
  const {id} = useParams(); // getting the project Id from the url string , by using the useParams Hook
  console.log("id from the id: ", id)
  const { user } = useSelector((state: RootState) => state); // getting the user state which was stored in the redux.
  const [files, setFiles] = useState<File[]>([]); // creating the files State to manage the state of files to upload file.

  const handleUpload = async () => {
    try {
      const categorizedFiles = categorizeFiles(files);
      await uploadFilesToCloudinary(categorizedFiles, id);
      setFiles([]); // Clear files after successful upload
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const categorizeFiles = (files: File[]) => {
    const categorizedFiles: Record<string, File[]> = {
      images: [],
      videos: [],
      docs: [],
      miscellaneous: [],
    };

    files.forEach((file) => {
      const fileType = file.fileType ? file.fileType.toLowerCase() : "";

      if (fileType.startsWith("image")) {
        categorizedFiles.images.push(file);
      } else if (fileType.startsWith("video")) {
        categorizedFiles.videos.push(file);
      } else if (
        fileType.endsWith("pdf") ||
        fileType.endsWith("doc") ||
        fileType.endsWith("docx")
      ) {
        categorizedFiles.docs.push(file);
      } else {
        categorizedFiles.miscellaneous.push(file);
      }
    });

    return categorizedFiles;
  };

  const uploadFilesToCloudinary = async (
    categorizedFiles: Record<string, File[]>,
    projectId: string
  ) => {
    const formData = new FormData();

    for (const folderName of Object.keys(categorizedFiles)) {
      const filesInFolder = categorizedFiles[folderName];

      for (const { file } of filesInFolder) {
        formData.append("files", file);
      }

      formData.append("folderName", folderName);
      formData.append("userName", user.firstName);
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/upload-to-cloudinary/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === "success") {
        console.log("Files uploaded successfully.");
      } else {
        console.error("Error uploading files.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  useEffect(() => {
    const fileInfo: FileInfo[] = files.map((file) => ({
      name: file.filename || "",
      size: file.fileSize || 0,
      type: file.fileType || "",
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
