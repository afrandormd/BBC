
"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { ImageItem } from '@/types';
import { UploadCloud, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadFormProps {
  onImageUploaded: (imageItemDraft: Omit<ImageItem, 'id' | 'uploadedAt' | 'tags'>) => void;
  isProcessing: boolean;
}

export function ImageUploadForm({ onImageUploaded, isProcessing }: ImageUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 20 * 1024 * 1024) { // 20MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 20MB.",
          variant: "destructive",
        });
        setFile(null);
        setPreview(null);
        event.target.value = ''; 
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file || !preview) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Note: id and uploadedAt will be set by the server/action
      const newImageDraft: Omit<ImageItem, 'id' | 'uploadedAt' | 'tags'> = {
        dataUri: preview,
        name: file.name,
        price: "Not set",
      };
      onImageUploaded(newImageDraft);
      setFile(null);
      setPreview(null);
      (event.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Error preparing image for upload:", error);
      toast({
        title: "Processing Error",
        description: "Could not process the image for upload. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <UploadCloud className="mr-3 h-7 w-7 text-primary" />
          Upload New Image
        </CardTitle>
        <CardDescription>Create a new product photo entry by uploading an image (max 20MB). Price can be set later.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="image-upload" className="block text-sm font-medium mb-1">Image File</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleFileChange}
              required
              disabled={isProcessing}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {preview && (
              <div className="mt-4 relative w-full h-48 rounded-md overflow-hidden border">
                <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" />
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full text-base py-3" disabled={isProcessing || !file}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-5 w-5" /> 
            )}
            {isProcessing ? 'Processing...' : 'Upload Image'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
