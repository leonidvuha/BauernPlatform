import type { ProductsResponse } from "@/types/product";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export const api = {
  products: {
    getAll: async (): Promise<ProductsResponse> => {
      const res = await fetch(`${BACKEND_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    getMy: async (): Promise<ProductsResponse> => {
      const res = await fetch(`${BACKEND_URL}/api/users/my-products`);
      if (!res.ok) throw new Error("Failed to fetch my products");
      return res.json();
    },
  },

  users: {
    getProfile: async (): Promise<any> => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("bp_token") : null;
      const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch profile");
      return res.json();
    },
  },
};
