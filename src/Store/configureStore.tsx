import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import rootReducer from '../reducers';

const persistConfig = {
	key: 'root',
	storage,
	stateReconciler: autoMergeLevel2, // handles merging nested state
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const reduxStore = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	
});
const persistor = persistStore(reduxStore);

export { reduxStore, persistor };