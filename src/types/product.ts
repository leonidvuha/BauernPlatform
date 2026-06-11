export type Product = {
  id: string;
  owner_id: string;
  category_id: number;
  title: string;
  description: string;
  price: string;
  unit: string;
  img_url: string;
  tags: { id: number; name: string }[];
  status?: string;
  lat?: number;
  lng?: number;
  created_at: string;
  updated_at?: string;
  contact?: {
    email: string;
    phone: string | null;
    fullName?: string;
  };
};

export type ProductsResponse = {
  products: Product[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    fallback?: boolean;
    fallback_word?: string;
  };
};
