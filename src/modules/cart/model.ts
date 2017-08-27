export interface ICartItem {
  productId: string;
  subProductId: string;
  colorId: string;
  price: number;
  count: number;
}

interface IBrand {
  name: string;
}

interface ISubProduct {
  id: string;
  article: string;
  price: number;
}

interface IImage {
  id: string;
  src: string;
  colorName: string;
}
