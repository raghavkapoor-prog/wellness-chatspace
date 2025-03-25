
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileUpload: (url: string) => void;
  accept?: string;
  previewUrl?: string;
  className?: string;
}

export const FileUploader = ({ 
  onFileUpload, 
  accept = "image/*", 
  previewUrl = "", 
  className 
}: FileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(previewUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // For this demo, we're simulating file upload by creating a data URL
    // In a real app, you would upload to a server or storage service
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onFileUpload(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex flex-col space-y-4", className)}>
      <Input
        type="file"
        ref={fileInputRef}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative rounded-md overflow-hidden border border-input">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="absolute bottom-2 right-2"
            onClick={triggerFileInput}
          >
            Change
          </Button>
        </div>
      ) : (
        <div 
          className="border-2 border-dashed border-input rounded-md h-48 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={triggerFileInput}
        >
          {accept.includes('image') ? (
            <Image className="h-10 w-10 text-muted-foreground mb-2" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          )}
          <p className="text-sm text-muted-foreground">
            Click to upload {accept.includes('image') ? 'an image' : 'a file'}
          </p>
        </div>
      )}
      
      {isUploading && (
        <div className="text-sm text-muted-foreground">Uploading...</div>
      )}
    </div>
  );
};
