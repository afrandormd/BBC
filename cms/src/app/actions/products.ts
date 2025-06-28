'use server';

import type { ProductItem, ServerActionResponse } from '@/types';
import { revalidatePath } from 'next/cache';

// ===================================================================================
// IMPORTANT: PRODUCT MANAGEMENT IS MOCKED
// To ensure a smooth development experience without a backend dependency, this
// feature operates on a temporary, in-memory data store.
// All data will be lost on server restart.
// ===================================================================================

let mockProductStore: ProductItem[] = [
    {
        id: 'prod_1',
        name: 'Keripik Pisang Original (Contoh)',
        price: 15000,
        description: 'Rasa original yang renyah dan gurih, dibuat dari pisang pilihan.',
        image: 'https://placehold.co/600x400.png',
        category: 'Keripik',
        createdAt: new Date(new Date().setDate(new Date().getDate()-2)).toISOString(),
        updatedAt: new Date(new Date().setDate(new Date().getDate()-2)).toISOString(),
    },
    {
        id: 'prod_2',
        name: 'Keripik Singkong Balado (Contoh)',
        price: 12000,
        description: 'Pedas manisnya pas, bikin nagih!',
        image: 'https://placehold.co/600x400.png',
        category: 'Keripik',
        createdAt: new Date(new Date().setDate(new Date().getDate()-1)).toISOString(),
        updatedAt: new Date(new Date().setDate(new Date().getDate()-1)).toISOString(),
    },
];

export async function fetchProductsAction(): Promise<ServerActionResponse<ProductItem[]>> {
  console.log('Server Action: fetchProductsAction (Mock)');
  await new Promise(resolve => setTimeout(resolve, 50));
  return { success: true, data: [...mockProductStore].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
}

export async function addProductAction(
  newProductData: Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>
): Promise<ServerActionResponse<ProductItem>> {
  console.log('Server Action: addProductAction (Mock)');
  await new Promise(resolve => setTimeout(resolve, 200));
  const newProduct: ProductItem = {
    ...newProductData,
    id: `prod_${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProductStore.unshift(newProduct);
  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard/analytics');
  return { success: true, data: newProduct };
}

export async function updateProductAction(
  productId: string,
  updates: Partial<Omit<ProductItem, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<ServerActionResponse<ProductItem>> {
  console.log('Server Action: updateProductAction (Mock)');
  await new Promise(resolve => setTimeout(resolve, 100));
  const productIndex = mockProductStore.findIndex(p => String(p.id) === productId);
  if (productIndex === -1) {
    return { success: false, error: "Product not found in mock store." };
  }
  mockProductStore[productIndex] = { ...mockProductStore[productIndex], ...updates, updatedAt: new Date().toISOString() };
  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard/analytics');
  return { success: true, data: mockProductStore[productIndex] };
}

export async function deleteProductAction(productId: string): Promise<ServerActionResponse> {
  console.log('Server Action: deleteProductAction (Mock)');
  await new Promise(resolve => setTimeout(resolve, 100));
  const initialLength = mockProductStore.length;
  mockProductStore = mockProductStore.filter(p => String(p.id) !== productId);
  if (mockProductStore.length === initialLength) {
    return { success: false, error: "Product not found for deletion in mock store." };
  }
  revalidatePath('/dashboard/products');
  revalidatePath('/dashboard/analytics');
  return { success: true };
}
