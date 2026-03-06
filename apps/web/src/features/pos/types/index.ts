export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
