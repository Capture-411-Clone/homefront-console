import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
/* eslint-disable import/no-cycle */
import authReducer from './slices/auth';
import opportunityReducer from './slices/opportunity';

// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  opportunity: opportunityReducer,
});

export default rootReducer;
