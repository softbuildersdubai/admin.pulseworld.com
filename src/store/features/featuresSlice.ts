import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FeaturesSliceState {
  featuresList: Feature[];
}

export interface Feature {
  name?: string;
  type?: string;
  description?: string;
  price?: number;
  status?: string;
  [key: string]: any;
}

const initialState: FeaturesSliceState = {
  featuresList: [],
};

const featuresSlice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    setFeaturesList: (state, action: PayloadAction<any>) => {
      return { ...state, featuresList: action.payload };
    },
  },
});

export const { setFeaturesList } = featuresSlice.actions;

export const selectFeatures = (state: { features: FeaturesSliceState }) => state.features;
export default featuresSlice.reducer;
