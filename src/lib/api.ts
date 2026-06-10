import type { Product, ProductsResponse } from '@/types/product';
import { UserProfile } from '@/types/user';

export interface FarmerResponse {
  id: string;
  fullName: string;
  about_me: string | null;
  contacts: {
    email: string;
    phone: string | null;
  };
  coordinates?: {
    lat: number;
    lng: number;
  } | null;
  products: Array<{
    id: string;
    title: string;
    price: string;
    imageUrl?: string;
    img_url?: string;
  }>;
}

// Добавили слово export и поправили count на множественное число под бэк
export interface ActiveSellerItem {
  id: string; // Добавили id, чтобы страница списка знала его тип
  fullName: string;
  about_me: string | null;
  contacts: {
    email: string;
    phone: string | null;
  };
  active_products_count: number;
}

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8080';

export const api = {
  products: {
    getAll: async (
      page = 1,
      categoryId?: number,
    ): Promise<ProductsResponse> => {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (categoryId) params.set('category_id', String(categoryId));
      const res = await fetch(`${BACKEND_URL}/api/products?${params}`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    getMy: async (): Promise<ProductsResponse> => {
      const res = await fetch(`${BACKEND_URL}/api/users/my-products`);
      if (!res.ok) throw new Error('Failed to fetch my products');
      return res.json();
    },
    getById: async (id: string): Promise<Product> => {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error('Failed to fetch product');
      return res.json();
    },
  },

  users: {
    getProfile: async (): Promise<UserProfile> => {
      const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    },

    getFarmerById: async (id: string): Promise<FarmerResponse> => {
      const res = await fetch(`${BACKEND_URL}/api/farmer/${id}`, {
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error('Failed to fetch farmer details');
      }
      return res.json() as Promise<FarmerResponse>;
    },

    // ПЕРЕНЕСЛИ СЮДА! Теперь метод законно находится внутри объекта users!
    getActiveSellers: async (): Promise<ActiveSellerItem[]> => {
      const res = await fetch(`${BACKEND_URL}/api/farmer/active/sellers`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Failed to fetch active sellers');
      return res.json();
    },
  }, // <-- Тут аккуратно закрывается блок users

  categories: {
    getAll: async () => {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      return res.json();
    },
  },
};
