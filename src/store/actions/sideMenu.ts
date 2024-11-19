import { AppThunk } from '@src/store';
import { toggleLoader } from '@src/store/reducers/sideMenu.ts';

export const getSideMenu = (): AppThunk => async (dispatch) => {
  try {
    dispatch(toggleLoader(true));
    // const data = await sideMenu.getSideMenu();
    // dispatch(setMenuData(data));
  } catch (error) {
    console.error('Error while get side menu: ', error);
  } finally {
    dispatch(toggleLoader(false));
  }
};
