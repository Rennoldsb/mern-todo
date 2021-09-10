import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {};
const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export let store = createStore(
  persistedReducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export let persistor = persistStore(store);
