import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import file_upload from "@/assets/icons/file-upload.svg";

type FileUploaderProps = {
  fieldChange: (files: File) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File>(new File([], ""));
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      setFile(file);
      fieldChange(file);
      setFileUrl(convertFileToUrl(file));
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
      className="flex flex-col items-center justify-center gap-4 bg-dark-3 rounded-xl cursor-pointer p-2 border-2 border-dashed border-gray-600 hover:border-gray-400 transition">
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="overflow-hidden rounded-md shadow-sm">
            <img
              src={fileUrl}
              width={30}
              height={30}
              alt="uploaded"
              className="object-cover"
            />
          </div>
          <p className="text-sm text-light-4 text-center mt-1">
            Clique aqui para trocar a foto
          </p>
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

          <h3 className="font-medium text-light-2 text-xs">
            Adicionar foto
          </h3>
        </div>
      )}
    </div>
  );
};

export default FileUploader;