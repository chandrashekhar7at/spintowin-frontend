import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './userinfoSlice'; // Ensure this imports the reducer function

const authPersistConfig = {
  key: 'auth', // Key for the persisted auth slice data
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, userReducer);

const store = configureStore({
  reducer: {
    authuser: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export {store};
