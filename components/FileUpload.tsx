import React, { useRef } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  description: string;
  icon: string;
  buttonText: string;
  image: string | null;
  onImageChange: (base64: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  id,
  label,
  description,
  icon,
  buttonText,
  image,
  onImageChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && typeof event.target.result === 'string') {
          onImageChange(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-black text-white inline-block px-3 py-1 text-sm font-bold mb-2 uppercase border-2 border-black">
        STEP {id === 'drawingInput' ? '01' : '02'}
      </div>
      <label className="block text-xl font-black text-black mb-2 tracking-tight">
        {label}
      </label>
      <p className="text-sm text-gray-600 mb-4 font-medium border-l-4 border-[#FF5E00] pl-3">
        {description}
      </p>
      
      <div 
        className={`relative w-full h-40 border-4 border-black cursor-pointer transition-all duration-200 overflow-hidden group rounded-none
          ${image ? 'bg-white' : 'bg-white hover:bg-[#FF5E00] hover:text-white'}`}
        onClick={() => fileInputRef.current?.click()}
        style={{
           boxShadow: image ? 'none' : '4px 4px 0px 0px rgba(0,0,0,1)'
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {image ? (
          <>
            <img 
              src={image} 
              alt="Preview" 
              className="w-full h-full object-contain absolute top-0 left-0 z-10 bg-gray-100"
            />
            <div className="absolute bottom-0 right-0 bg-[#FF5E00] text-black text-xs font-bold px-2 py-1 border-t-4 border-l-4 border-black z-20">
              CHANGE
            </div>
          </>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full p-2 pointer-events-none z-0">
            <div className="text-5xl mb-2 group-hover:scale-110 transition-transform">{icon}</div>
            <div className="text-lg font-bold uppercase tracking-wide group-hover:text-white text-black">
              {buttonText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};