import { createStore , applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from 'redux-thunk' 
import userPostsReducer from "./Userposts/UserPostsReducer";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: "root",
    storage,
  };


  const persistedReducer = persistReducer(persistConfig, userPostsReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };