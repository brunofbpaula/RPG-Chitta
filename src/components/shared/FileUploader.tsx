import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { convertFileToUrl } from "@/lib/utils";
import file_upload from "@/assets/icons/file-upload.svg";

type FileUploaderProps = {
  fieldChange: (files: File) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);
  const [fileName, setFileName] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      fieldChange(file);
      setFileUrl(convertFileToUrl(file));
      setFileName(file.name);

    },
    [fieldChange]
  );


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="w-auto h-30 max-h-30 flex flex-col items-center justify-center gap-2 bg-dark-3 
                  rounded-xl cursor-pointer p-2 border-2 border-dashed border-gray-600
                  bg-white
                 hover:border-gray-400 transition overflow-hidden"
      >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          {fileName && (
            <p className="font-medium text-black text-xs">
              {fileName}
            </p>
          )}
          <div className="overflow-hidden rounded-md shadow-sm">
            <img
              src={fileUrl}
              width={45}
              height="auto"
              alt="uploaded"
              className="object-cover"
            />
          </div>
          <h3 className="font-medium text-black text-xs">
            Trocar foto
          </h3>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center gap-3">
          <img
            src={file_upload}
            width={30}
            height={30}
            alt="upload"
            className="opacity-80"
          />

          <h3 className="font-medium text-black text-xs">
            Adicionar foto
          </h3>
        </div>
      )}
    </div>
  );
};

export default FileUploader;