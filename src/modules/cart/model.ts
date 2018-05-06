export interface ICartItem {
  id: number;
  totalPrice: number;
  email: string;
  phone: string;
  comment: string;
  city: string;
  address: string;
  items: ICartItem[];
  amount: number;
  firstName: string;
  lastName: string;
}

export interface ICartItem {
  id: number;
  amount: number;
  price: number;
  subProduct: ISubProduct;
  attributeValues: IAttributeValue[];
}

export interface ISubProduct {
  id: string;
  product: IProduct;
  article: string;
  price: number;
  oldPrice: number;
  discount: number;
  attributes: any;
}

export interface IAttributeValue {
  in: string;
  name: string;
  value: string;
  description: string;
}

export interface IProduct {
  name: string;
  shortDescription: string;
  desctiption: string;
  isNew: boolean;
  id: string;
  brand: IBrand;
  category: any;
  images: [IImage];
}

export interface IBrand {
  id: number;
  name: string;
  alias: string;
  description: string;
}

export interface IImage {
  id: string;
  src: string;
  productId: number;
  height: number;
  width: number;
  isTitle: boolean;
}
