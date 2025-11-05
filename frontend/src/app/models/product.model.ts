export interface Product {
  id: string;
  name: string;
  image?: string | null;
  categoryId?: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  category?: {
    id: string;
    name: string;
  };
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}

export interface ProductSingleResponse {
  success: boolean;
  message: string;
  data: Product;
}