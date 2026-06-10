import type { Product, ProductsResponse } from "@/types/product";
import { UserProfile } from "@/types/user";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export const api = {
  products: {
    getAll: async (page = 1, categoryId?: number): Promise<ProductsResponse> => {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (categoryId) params.set("category_id", String(categoryId));
      const res = await fetch(`${BACKEND_URL}/api/products?${params}`, {
        next: { revalidate: 0 },
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    getMy: async (): Promise<ProductsResponse> => {
      const res = await fetch(`${BACKEND_URL}/api/users/my-products`);
      if (!res.ok) throw new Error("Failed to fetch my products");
      return res.json();
    },
    getById: async (id: string): Promise<Product> => {
      const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
        next: { revalidate: 60 },
      });
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
  },

  users: {
    getProfile: async (): Promise<UserProfile> => {
      const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  },

  categories: {
    getAll: async () => {
      const res = await fetch(`${BACKEND_URL}/api/categories`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  },
};
