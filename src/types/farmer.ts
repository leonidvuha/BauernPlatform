export interface FarmerInfo {
  id: string;
  fullName: string;
  about_me: string | null;
  contacts: { email: string; phone: string | null };
  active_products_count: number;
}

export interface FarmerProfile {
  id: string;
  fullName: string;
  about_me: string | null;
  avatarUrl?: string | null;
  contacts: { email: string; phone: string | null };
  coordinates?: { lat: number; lng: number } | null;
  products: Array<{
    id: string;
    title: string;
    price: string;
    imageUrl?: string;
    tags?: Array<{ id: number; name: string }>;
  }>;
}

export interface FarmersResponse {
  farmers: FarmerInfo[];
  meta: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
}