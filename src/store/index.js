import { createStore } from "redux";
import rootReducer from "./modules/rootReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'country',
    storage: storage,
    whitelist: ['country'],
  };

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer);

const persistor = persistStore(store);

export { persistor, store };
