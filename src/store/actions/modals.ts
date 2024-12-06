import { AppThunk } from '@src/store';
import modals from '@src/store/api/modals.ts';
import {
  openModalByType,
  setError,
  setLoading,
  setModalData
} from '@src/store/reducers/modals';
import { PopupType } from '@src/types/modals';

export const fetchDataAndOpenModal =
  (modalType: PopupType, id: string): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const existingData = state.modals.data[modalType]?.[id];
    if (existingData) {
      dispatch(openModalByType({ modalType, id }));
      return;
    }
    try {
      dispatch(setLoading(true));
      const response = await modals.getModalData(modalType, id);
      const data = response.data.data;
      dispatch(setModalData({ modalType, id, data }));
      dispatch(openModalByType({ modalType, id }));
    } catch {
      dispatch(setError('Failed to fetch modal data'));
    } finally {
      dispatch(setLoading(false));
    }
  };
