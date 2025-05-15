import { useEffect, useState } from 'react';

import { Folder } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface UploaderProps {
  onChangeFile?: (file: File | null) => void;
}

export default function Uploader({ onChangeFile }: UploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>();

  const handleFileChange = (file: File | null) => {
    setPreviewUrl(file ? URL.createObjectURL(file) : undefined);
    onChangeFile?.(file);
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <>
      <div
        className={twMerge(
          'border-system-alarm3 group relative cursor-pointer rounded border border-dashed py-4 hover:bg-gray-50',
          dragOver ? 'bg-gray-50' : 'bg-white',
        )}
        style={{
          backgroundImage: previewUrl ? `url(${previewUrl})` : undefined,
          backgroundSize: 'cover',
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOver(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragOver(false);

          if (e.dataTransfer?.files?.[0]) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => document.getElementById('fileUpload')?.click()}
      >
        <div
          className={twMerge(
            'flex w-fit flex-col items-center gap-1 justify-self-center rounded-md bg-white/70 px-6 py-3',
            previewUrl ? 'group-hover:bg-white/80' : 'group-hover:bg-gray-50',
          )}
        >
          <div className="flex items-center gap-1.5">
            <Folder size={22} color="black" />
            <p className="subtitle2-nanum text-primary-gray-600">파일 선택</p>
          </div>
          <p className="body2-nanum text-neutral-500">
            {dragOver
              ? '파일을 놓아서 업로드하세요'
              : '파일을 여기로 드래그하거나 클릭하여 업로드하세요'}
          </p>
        </div>
      </div>

      <input
        id="fileUpload"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
      />
    </>
  );
}
