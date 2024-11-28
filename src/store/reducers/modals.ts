import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modals } from '@src/types/global.ts';

type ModalsType = {
  [key in Modals]: boolean;
};

export type ModalStore = {
  modals: ModalsType;
};

const initialModalState: ModalsType = {
  imageAndText: false,
  videoGallery: false,
  imageSlider: false,
  imageAndVideo: false,
  verticalVideos: false
};

const initialState: ModalStore = {
  modals: initialModalState
};

const modalSlice = createSlice({
  name: 'Modals',
  initialState,
  reducers: {
    openModalByType: (state, { payload }: PayloadAction<Modals>) => {
      state.modals[payload] = true;
    },
    closeModals: (state) => {
      state.modals = initialModalState;
    }
  }
});

export const { openModalByType, closeModals } = modalSlice.actions;

export default modalSlice.reducer;
