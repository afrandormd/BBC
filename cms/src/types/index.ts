

export interface User {
  id: string | number; 
  name: string;
  email: string;
  role: 'ADMIN' | 'AUTHOR' | 'OPERATOR' | 'USER'; // Added 'USER' from API docs
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface MediaItem {
  id: string;
  url: string; 
  name: string;
  altText?: string;
  uploadedAt: Date | string;
}

export interface ProductItem {
  id: string | number;
  name: string;
  price: number;
  description?: string | null;
  image: string;
  category: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Represents the API's top-level response structure
export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  token?: string; // For JWT response
};

// Represents the response from a Server Action
export type ServerActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: string | { [key: string]: string[] } | null;
};
