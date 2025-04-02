
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { uploadImage } from '@/utils/articleUtils';
import { toast } from 'sonner';

interface SupabaseFileUploaderProps {
  onFileUpload: (url: string) => void;
  accept?: string;
  previewUrl?: string;
  className?: string;
  bucketName: 'article_images' | 'journey_images';
}

export const SupabaseFileUploader = ({ 
  onFileUpload, 
  accept = "image/*", 
  previewUrl = "", 
  className,
  bucketName
}: SupabaseFileUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(previewUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setIsUploading(true);
    
    try {
      const uploadedUrl = await uploadImage(file, bucketName);
      
      if (uploadedUrl) {
        onFileUpload(uploadedUrl);
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
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
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Change'}
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
          {isUploading && (
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          )}
        </div>
      )}
    </div>
  );
};
