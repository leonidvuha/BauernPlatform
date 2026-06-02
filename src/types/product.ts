export type Product = {
  id: string;
  owner_id: string;
  category_id: number;
  title: string;
  description: string;
  price: string;
  unit: string;
  img_url: string;
  tags: string[];
  status?: string;
  lat?: string;
  lng?: string;
  created_at: string;
  updated_at?: string;
};

export type ProductsResponse = {
  products: Product[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
};