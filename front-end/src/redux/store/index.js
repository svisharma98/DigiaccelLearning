import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import settingsReducer from "../reuducer/settingSlice";
import userReducer from "../reuducer/authSlice";

const persistConfig = {
  key: 'root',
  storage,
  manualPersisting: true,
};

const rootReducer = combineReducers({
  Settings: settingsReducer,
  UserSignup: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});

export const persistor = persistStore(store);
