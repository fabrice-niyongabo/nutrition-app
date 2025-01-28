import {createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
};

//@ts-ignore
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));
//@ts-ignore
export const persistor = persistStore(store);
