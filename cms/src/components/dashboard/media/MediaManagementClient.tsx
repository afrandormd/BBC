
"use client";

import { useState, useEffect } from 'react';
import type { MediaItem } from '@/types';
import { MediaUploadForm } from './MediaUploadForm'; 
import { MediaCard } from './MediaCard'; 
import { EditMediaModal } from './EditMediaModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon as LibraryIcon, UploadCloud, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchMediaItemsAction, uploadMediaItemAction, updateMediaItemAction, deleteMediaItemAction } from '@/app/actions/media';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function MediaManagementClient() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMediaItem, setEditingMediaItem] = useState<MediaItem | null>(null);
  const [activeTab, setActiveTab] = useState("library");

  useEffect(() => {
    const loadMedia = async () => {
      setIsLoading(true);
      const response = await fetchMediaItemsAction();
      if (response.success && response.data) {
        setMediaItems(response.data.map(item => ({...item, uploadedAt: new Date(item.uploadedAt)})));
      } else {
        toast({ title: "Error", description: response.error || "Could not load media items.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    loadMedia();
  }, [toast]);

  const handleMediaUploaded = async (name: string, dataUri: string, altText?: string) => {
    setIsProcessing(true);
    const response = await uploadMediaItemAction({ name, url: dataUri, altText });
    if (response.success && response.data) {
      setMediaItems((prevItems) => [response.data!, ...prevItems].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()));
       toast({
        title: "Media Uploaded",
        description: `${response.data.name} has been uploaded.`,
      });
      setActiveTab("library"); // Switch to library tab after successful upload
    } else {
      toast({ title: "Upload Error", description: response.error || "Could not upload media.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  const handleOpenEditModal = (item: MediaItem) => {
    setEditingMediaItem(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateMediaItem = async (mediaId: string, updates: Partial<Pick<MediaItem, 'name' | 'altText'>>) => {
    setIsProcessing(true);
    const response = await updateMediaItemAction(mediaId, updates);
    if (response.success && response.data) {
      setMediaItems((prevItems) =>
        prevItems.map((item) =>
          item.id === mediaId ? { ...item, ...response.data, uploadedAt: new Date(response.data!.uploadedAt) } : item
        )
      );
      toast({
        title: "Media Updated",
        description: `Details for ${response.data.name} have been updated.`,
      });
    } else {
       toast({ title: "Update Error", description: response.error || "Could not update media details.", variant: "destructive" });
    }
    setIsProcessing(false);
    setIsEditModalOpen(false);
  };
  
  const handleDeleteMediaItem = async (mediaId: string) => {
    setIsProcessing(true);
    const response = await deleteMediaItemAction(mediaId);
    if (response.success) {
      setMediaItems((prevItems) => prevItems.filter((item) => item.id !== mediaId));
      toast({ title: "Media Deleted", description: "The media item has been successfully deleted." });
    } else {
      toast({ title: "Delete Error", description: response.error || "Could not delete media item.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-0">
      <h1 className="text-3xl font-bold mb-6">Media Library</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-fit">
          <TabsTrigger value="library">
            <LibraryIcon className="mr-2 h-5 w-5" /> Media Library
          </TabsTrigger>
          <TabsTrigger value="upload">
            <UploadCloud className="mr-2 h-5 w-5" /> Upload Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <MediaUploadForm onMediaUploaded={handleMediaUploaded} isProcessing={isProcessing} />
        </TabsContent>

        <TabsContent value="library" className="mt-6">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-2">Loading media library...</p>
            </div>
          ) : mediaItems.length === 0 ? (
             <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Empty Library</AlertTitle>
                <AlertDescription>
                    No media items found. You can upload new files using the "Upload Files" tab.
                </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaItems.map((item) => (
                <MediaCard 
                  key={item.id} 
                  mediaItem={item} 
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteMediaItem}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {editingMediaItem && (
        <EditMediaModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          mediaItem={editingMediaItem}
          onSave={handleUpdateMediaItem}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
