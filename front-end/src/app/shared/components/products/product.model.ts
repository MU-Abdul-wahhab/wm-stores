export interface Product {
  id: string;
  defaultImgPath: string;
  hoverImgPath: string;
  category: string;
  title: string;
  ratingPercentage: number;
  discountPercentage?: number;
  price: number;
}
