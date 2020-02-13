import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';

import reducer from './reducers/videos';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['selectedMovie']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);