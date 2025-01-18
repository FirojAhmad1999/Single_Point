import React, { useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const ImageUpload = ({ value, onChange, className }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(value);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-gray-200 mb-2">
        Image
      </label>
      
      {preview ? (
        <div className="relative inline-block">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-24 h-24 rounded-full object-cover border-2 border-[#2D3548]"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-[#2D3548] cursor-pointer hover:border-indigo-500 transition-colors"
        >
          <Upload className="w-6 h-6 text-gray-400" />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <p className="mt-2 text-sm text-gray-400">
        Click to upload or drag and drop
      </p>
      <p className="text-xs text-gray-500">
        PNG, JPG up to 5MB
      </p>
    </div>
  );
};

export default ImageUpload;