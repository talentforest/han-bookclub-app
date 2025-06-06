import { useRef } from 'react';

import { FiImage } from 'react-icons/fi';

interface ImageInputProps {
  onImageChange: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function ImageInput({
  onImageChange,
  className = '',
}: ImageInputProps) {
  const fileInput = useRef(null);

  return (
    <>
      <button
        type="button"
        onClick={() => fileInput.current?.click()}
        className={`absolute bottom-2 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-pointCoral ${className}`}
      >
        <FiImage fontSize={13} className="size-4 text-white" />
      </button>
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/jpg,image/png,image/jpeg"
        name="profile_img"
        onChange={onImageChange}
        ref={fileInput}
      />
    </>
  );
}
