export const deleteProduct = (id: string) =>
  fetch(`/api/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

export const toggleProductStatus = (id: string, status: boolean) =>
  fetch(`/api/products/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ status }),
  });

export const createProduct = (data: {
  title: string;
  description: string;
  price: number;
  unit: string;
  category_id: number;
  tags: string[];
  lat: number;
  lng: number;
  img: string;
}) =>
  fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

export const updateProduct = (
  id: string,
  data: {
    title: string;
    description: string;
    price: number;
    unit: string;
    category_id: number;
    tags: string[];
    lat: number;
    lng: number;
    img?: string;
  },
) =>
  fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });
