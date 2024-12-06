import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuLinkParentContent } from '@src/types/sideMenu.ts';

export type sideMenuStore = {
  menu: MenuLinkParentContent[] | null;
  selectedMenuItem: MenuLinkParentContent | null;
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
    setMenuData(state, action: PayloadAction<MenuLinkParentContent[]>) {
      state.menu = action.payload;
    },
    setSelectedMenuItem(
      state,
      action: PayloadAction<MenuLinkParentContent | null>
    ) {
      state.selectedMenuItem = action.payload;
    }
  }
});

export const { toggleLoader, setMenuData, setSelectedMenuItem } =
  sideMenuSlice.actions;

export default sideMenuSlice.reducer;
