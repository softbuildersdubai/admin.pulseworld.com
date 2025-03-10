import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  _id: string;
  provider: {
    _id: string;
    name: string;
    logo: {
      _id: string;
      path: string;
      [key: string]: any; // Dynamic properties
    };
  };
  name: string;
  description: string;
  price: number;
  image: {
    _id: string;
    path: string;
    [key: string]: any; // Dynamic properties
  };
  images: {
    _id: string;
    path: string;
    [key: string]: any; // Dynamic properties
  }[];
  status: 'ACTIVE' | 'INACTIVE'; // Assuming these are the only two possible values
  deletedAt: string | null; // Assuming it could be a string (date) or null
  createdAt: string; // Assuming it's always a string (date)
}

export interface ProductStateSlice {
  products: {
    list: Product[];
    paginate: any;
  };
}

const initialState: ProductStateSlice = {
  products: {
    list: [],
    paginate: {},
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any>) => {
      return { ...state, products: action.payload };
    },
  },
});

export const { setProducts } = productSlice.actions;
export const selectProductSlice = (state: { product: ProductStateSlice }) => state.product;

export default productSlice.reducer;
