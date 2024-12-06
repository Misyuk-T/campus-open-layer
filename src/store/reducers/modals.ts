import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalDataMap, PopupDataTypeMap, PopupType } from '@src/types/modals';

export type ModalStore = {
  data: ModalDataMap;
  isLoading: boolean;
  openModal: {
    type: PopupType | null;
    id: string | null;
  };
  error: string;
};

const initialState: ModalStore = {
  data: {
    [PopupType.POPUP_WITH_IMAGE_AND_VIDEOS]: {},
    [PopupType.SINGLE_TEXT_POPUP]: {},
    [PopupType.VIDEO_POPUP]: {},
    [PopupType.IMAGE_SLIDER_POPUP]: {}
  } as ModalDataMap,
  isLoading: false,
  openModal: {
    type: null,
    id: null
  },
  error: ''
};

const modalSlice = createSlice({
  name: 'Modals',
  initialState,
  reducers: {
    openModalByType: (
      state,
      { payload }: PayloadAction<{ modalType: PopupType; id: string }>
    ) => {
      state.openModal = { type: payload.modalType, id: payload.id };
    },
    closeModals: (state) => {
      state.openModal = { type: null, id: null };
    },
    setModalData: <K extends PopupType>(
      state: ModalStore,
      action: PayloadAction<{
        modalType: PopupType;
        id: string;
        data: PopupDataTypeMap[K];
      }>
    ) => {
      const { modalType, id, data } = action.payload;
      state.data[modalType][id] = data;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    }
  }
});

export const {
  openModalByType,
  closeModals,
  setModalData,
  setLoading,
  setError
} = modalSlice.actions;

export default modalSlice.reducer;
