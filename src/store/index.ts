import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
