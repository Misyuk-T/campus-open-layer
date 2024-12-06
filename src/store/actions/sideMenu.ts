import { AppThunk } from '@src/store';
import sideMenu from '@src/store/api/sideMenu.ts';
import { setMenuData, toggleLoader } from '@src/store/reducers/sideMenu.ts';

export const getSideMenu = (): AppThunk => async (dispatch) => {
  try {
    dispatch(toggleLoader(true));
    const {
      data: { data }
    } = await sideMenu.getSideMenu();

    dispatch(setMenuData(data));
  } catch (error) {
    console.error('Error while getting side menu: ', error);
  } finally {
    dispatch(toggleLoader(false));
  }
};
