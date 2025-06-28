
"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Loader2, FileText, Image as ImageIcon } from 'lucide-react';
import NextImage from 'next/image';

interface MediaUploadFormProps {
  onMediaUploaded: (name: string, dataUri: string, altText?: string) => void;
  isProcessing: boolean;
}

export function MediaUploadForm({ onMediaUploaded, isProcessing }: MediaUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [fileName, setFileName] = useState('');
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        setFile(null);
        setPreview(null);
        setFileName('');
        event.target.value = ''; 
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name.split('.').slice(0, -1).join('.') || selectedFile.name); // Default name from filename without extension
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setPreview(null);
      setFileName('');
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
    if (!fileName.trim()) {
        toast({
            title: "File name required",
            description: "Please provide a name for the media file.",
            variant: "destructive"
        });
        return;
    }

    try {
      onMediaUploaded(fileName, preview, altText.trim() || undefined);
      setFile(null);
      setPreview(null);
      setAltText('');
      setFileName('');
      const fileInput = document.getElementById('media-upload-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Error preparing media for upload:", error);
      toast({
        title: "Processing Error",
        description: "Could not process the media for upload. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <UploadCloud className="mr-3 h-7 w-7 text-primary" />
          Upload New Media
        </CardTitle>
        <CardDescription>Upload images to your media library (max 5MB).</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="media-upload-input" className="block text-sm font-medium mb-1">Image File</Label>
            <Input
              id="media-upload-input"
              type="file"
              accept="image/png, image/jpeg, image/gif, image/webp"
              onChange={handleFileChange}
              required
              disabled={isProcessing}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
            {preview && (
              <div className="mt-4 relative aspect-video w-full max-w-sm mx-auto rounded-md overflow-hidden border">
                <NextImage src={preview} alt="Image preview" layout="fill" objectFit="contain" />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="media-name" className="flex items-center">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" /> File Name
            </Label>
            <Input 
                id="media-name" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter a name for the media"
                disabled={isProcessing || !file}
                required
            />
          </div>
          <div>
            <Label htmlFor="media-alt-text" className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" /> Alt Text (Optional)
            </Label>
            <Textarea
              id="media-alt-text"
              placeholder="Describe the image for accessibility"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              rows={2}
              disabled={isProcessing || !file}
            />
          </div>
          
          <Button type="submit" className="w-full text-base py-3" disabled={isProcessing || !file}>
            {isProcessing ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud className="mr-2 h-5 w-5" /> 
            )}
            {isProcessing ? 'Uploading...' : 'Upload to Library'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
