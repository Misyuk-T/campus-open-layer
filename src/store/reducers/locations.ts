import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarChildrenItem } from '@src/types/global';

export interface LocationsState {
  activeLocations: SidebarChildrenItem[];
  activeLocation: SidebarChildrenItem | null;
}

const initialState: LocationsState = {
  activeLocations: [],
  activeLocation: null
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setActiveLocations(state, action: PayloadAction<SidebarChildrenItem[]>) {
      state.activeLocations = action.payload;
    },
    setActiveLocation(
      state,
      action: PayloadAction<SidebarChildrenItem | null>
    ) {
      state.activeLocation = action.payload;
    }
  }
});

export const { setActiveLocations, setActiveLocation } = locationsSlice.actions;

export default locationsSlice.reducer;
