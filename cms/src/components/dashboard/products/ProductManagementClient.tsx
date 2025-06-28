
"use client";

import { useState, useEffect } from 'react';
import type { ProductItem } from '@/types';
import { ProductForm } from './ProductForm'; 
import { ProductCard } from './ProductCard'; 
import { EditProductModal } from './EditProductModal';
import { PackageSearch, Loader2, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchProductsAction, addProductAction, updateProductAction, deleteProductAction } from '@/app/actions/products';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ProductManagementClient() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      const response = await fetchProductsAction();
      if (response.success && response.data) {
        setProducts(response.data.map(p => ({
          ...p,
          createdAt: new Date(p.createdAt),
          updatedAt: new Date(p.updatedAt)
        })));
      } else {
        toast({ title: "Error", description: response.error || "Could not load products.", variant: "destructive" });
      }
      setIsLoading(false);
    };
    loadProducts();
  }, [toast]);

  const handleProductAdded = async (newProductData: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    setIsProcessing(true);
    const response = await addProductAction(newProductData);
    if (response.success && response.data) {
      setProducts((prev) => [response.data!, ...prev].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
       toast({
        title: "Product Added",
        description: `"${response.data.name}" has been added to the catalog.`,
      });
    } else {
      toast({ title: "Add Error", description: response.error || "Could not add product.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (productId: string, updates: Partial<Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setIsProcessing(true);
    const response = await updateProductAction(productId, updates);
    if (response.success && response.data) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === response.data!.id ? { ...response.data!, createdAt: new Date(p.createdAt), updatedAt: new Date(response.data!.updatedAt) } : p
        )
      );
      toast({
        title: "Product Updated",
        description: `Details for "${response.data.name}" have been updated.`,
      });
    } else {
       toast({ title: "Update Error", description: response.error || "Could not update product details.", variant: "destructive" });
    }
    setIsProcessing(false);
    setIsEditModalOpen(false);
  };
  
  const handleDeleteProduct = async (productId: string) => {
    setIsProcessing(true);
    const response = await deleteProductAction(productId);
    if (response.success) {
      setProducts((prev) => prev.filter((p) => String(p.id) !== productId));
      toast({ title: "Product Deleted", description: "The product has been successfully deleted." });
    } else {
      toast({ title: "Delete Error", description: response.error || "Could not delete product.", variant: "destructive" });
    }
    setIsProcessing(false);
  };

  return (
    <div className="container mx-auto px-0">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <ProductForm onProductAdded={handleProductAdded} isProcessing={isProcessing} />
        </div>
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="ml-2">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
             <Alert>
                <PackageSearch className="h-4 w-4" />
                <AlertTitle>No Products Yet</AlertTitle>
                <AlertDescription>
                    Your product catalog is empty. Add your first product using the form.
                </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteProduct}
                  isProcessing={isProcessing}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          product={editingProduct}
          onSave={handleUpdateProduct}
          isProcessing={isProcessing}
        />
      )}
    </div>
  );
}
