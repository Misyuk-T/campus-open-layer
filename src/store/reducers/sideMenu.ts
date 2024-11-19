import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SidebarItem } from '@src/types/global.ts';
import { SideMenuResponseData } from '@src/types/sideMenu.ts';

export type sideMenuStore = {
  menu: SideMenuResponseData | null;
  selectedMenuItem: SidebarItem | null;
  isLoading: boolean;
};

const initialState: sideMenuStore = {
  menu: null,
  selectedMenuItem: null,
  isLoading: false
};

const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {
    toggleLoader(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setMenuData(state, action: PayloadAction<SideMenuResponseData>) {
      state.menu = action.payload;
    },
    setSelectedMenuItem(state, action: PayloadAction<SidebarItem | null>) {
      state.selectedMenuItem = action.payload;
    }
  }
});

export const { toggleLoader, setMenuData, setSelectedMenuItem } =
  sideMenuSlice.actions;

export default sideMenuSlice.reducer;
