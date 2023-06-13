import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// These are helpers that run before the action hits the reducer
const middleWares = [];

// This is a chained curry function

// The first function recieves the store object
// This returns another function which recieves the next method
// The next function this returns recieves the action method

// This is how to write your own middleware
// Nice as it will syncronously show you what is happening at every step
// Redux logger does not do that, bit more

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     return next(action);
//   }
//   console.log("type", action.type);
//   console.log("payload", action.payload);
//   console.log("state", store.getState);

//   next(action); // This will make the action hit the reducers and update
//   console.log("nextState", store.getState()); // So now we will get the next state
// };

// const middleWares = [loggerMiddleware];

const persistConfig = {
  key: "root",
  storage,
  blackList: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Generating the store object, pretty important stuff!
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
