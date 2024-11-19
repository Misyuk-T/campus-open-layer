import { Action, combineReducers, Reducer } from '@reduxjs/toolkit';
import locations, { LocationsState } from '@src/store/reducers/locations.ts';
import modals, { ModalStore } from '@src/store/reducers/modals.ts';
import sideMenu, { sideMenuStore } from '@src/store/reducers/sideMenu.ts';

type RootState = {
  modals: ModalStore;
  sideMenu: sideMenuStore;
  locations: LocationsState;
};

const combinedReducer: Reducer<RootState, Action> = combineReducers({
  modals: modals,
  sideMenu: sideMenu,
  locations: locations
});

const rootReducer: Reducer<RootState, Action> = (
  state: RootState | undefined,
  action: Action
) => {
  return combinedReducer(state, action);
};

export default rootReducer;
