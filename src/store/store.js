import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// These are helpers that run before the action hits the reducer
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// Generating the store object, pretty important stuff!
export const store = createStore(rootReducer, undefined, composedEnhancers);
