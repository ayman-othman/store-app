export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IProductRating;
  quantity?: number;
  index?: number;
}

export interface IAddProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: IProductRating;
  index?: number;
}

export interface IProductRating {
  rate: number;
  count: number;
}

export interface IDeleteProduct {
  id?: number;
  index: number;
}
