import { ApiResponseData, PopupType } from '@src/types/modals.ts';
import { get } from '@src/utils/axios.ts';

const modals = {
  getModalData(type: PopupType, id: string) {
    return get<ApiResponseData>(`/jsonapi/paragraph/${type}/${id}`);
  }
};

export default modals;
