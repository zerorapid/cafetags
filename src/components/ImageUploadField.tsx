import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import './ImageUploadField.css';
import { UploadCloud, Loader2 } from 'lucide-react';

interface ImageUploadFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Skip compression for SVGs, they are vector and small, and canvas rasterizes them
    if (file.type === 'image/svg+xml') {
      resolve(file);
      return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    reader.onerror = (e) => reject(e);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Cap at 1080px for standard 1080p width/height to save massive bandwidth
      const maxDim = 1080;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert aggressively to WebP
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          // Only fallback to original if compression fails terribly, but WebP almost never does.
          if (blob.size > file.size && file.type === 'image/webp') {
            resolve(file);
            return;
          }
          
          const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
          const compressedFile = new File([blob], newFileName, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        },
        'image/webp',
        0.70 // 70% quality WebP is excellent and extremely small
      );
    };

    reader.readAsDataURL(file);
  });
};

import { useToast } from './ui/ToastContext';

export function ImageUploadField({ value, onChange, placeholder, required }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleProcessFile = async (rawFile: File) => {
    try {
      setIsUploading(true);
      const file = await compressImage(rawFile);

      const fileName = `${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('cafe-images')
        .upload(fileName, file, { contentType: file.type, upsert: false });
      
      if (uploadError) throw uploadError;
      
      const { data: urlData } = supabase.storage
        .from('cafe-images').getPublicUrl(fileName);
        
      onChange(urlData.publicUrl);
      toast("Image successfully processed and uploaded!");
    } catch (error: any) {
      console.error("Error uploading image:", error);
      toast(`Failed to upload image: ${error?.message || "Unknown error"}`);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (rawFile) handleProcessFile(rawFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const rawFile = e.dataTransfer.files?.[0];
    if (rawFile && rawFile.type.startsWith('image/')) {
      handleProcessFile(rawFile);
    } else {
      toast("Please drop a valid image file.");
    }
  };

  return (
    <div 
      className={`relative border-2 border-dashed rounded-lg transition-colors p-1 ${isDragging ? 'border-amber-500 bg-amber-50' : 'border-stone-200 bg-[#FAF9F6]'} ${isUploading ? 'opacity-70 pointer-events-none' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col sm:flex-row items-center gap-2 p-2 w-full">
        <input
          type="text"
          placeholder={placeholder || "https://... or Drag & Drop"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="flex-1 bg-transparent border-none text-xs font-mono text-stone-700 w-full focus:outline-none p-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
        <button 
          type="button" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-sm cursor-pointer"
        >
          {isUploading ? <Loader2 className="animate-spin" size={14} /> : <UploadCloud size={14} />}
          {isUploading ? 'Processing...' : 'Upload Media'}
        </button>
      </div>
      
      {isDragging && (
        <div className="absolute inset-0 flex items-center justify-center bg-amber-500/10 rounded-lg backdrop-blur-[1px]">
          <span className="text-amber-700 font-bold uppercase tracking-widest text-[11px] pointer-events-none">Drop image here</span>
        </div>
      )}
    </div>
  );
}
