export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
  quantity?: number;
}

export interface IProductRating {
  rate: number;
  count: number;
}
