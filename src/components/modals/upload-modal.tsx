import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FileUploader from "../project/components/uploader";

const UploadModal = () => {
  return (
    <DialogContent>
      <DialogHeader>
        {/* <DialogTitle>Upload Files</DialogTitle> */}
        <DialogDescription>
          <FileUploader />
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default UploadModal;
