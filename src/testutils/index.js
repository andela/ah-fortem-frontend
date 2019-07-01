import rootReducer from "../redux/reducers";
import { middlewares } from "../redux/store";
import { createStore, applyMiddleware } from "redux";

/**
 * - this function returns the element that has
 * - the data-test attribute provided in the val argument
 * @param {ShallowWrapper} wrapper - component object
 * @param {string} val - value of the data-test property
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

/**
 * @function storeFactory
 * @param {object} initialState - Initial state for the store
 * @returns {Store} - Redux Store.
 */
export const storeFactory = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
