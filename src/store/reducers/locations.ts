import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuLinkChildrenContent } from '@src/types/sideMenu.ts';

export interface LocationsState {
  activeLocations: MenuLinkChildrenContent[];
  activeLocation: MenuLinkChildrenContent | null;
}

const initialState: LocationsState = {
  activeLocations: [],
  activeLocation: null
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setActiveLocations(
      state,
      action: PayloadAction<MenuLinkChildrenContent[]>
    ) {
      state.activeLocations = action.payload;
    },
    setActiveLocation(
      state,
      action: PayloadAction<MenuLinkChildrenContent | null>
    ) {
      state.activeLocation = action.payload;
    }
  }
});

export const { setActiveLocations, setActiveLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
