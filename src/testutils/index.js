import rootReducer from "../redux/reducers";
import { middlewares } from "../redux/store";
import { createStore, applyMiddleware } from "redux";
import axios from "axios";

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

export const rejectPromise = method => {
  jest.spyOn(axios, method);
  let action;
  if (method === "get") {
    action = axios.get.mockImplementation(() => Promise.reject({}));
  }
  if (method === "post") {
    action = axios.post.mockImplementation(() => Promise.reject({}));
  }

  return action;
};

export const snackBarError = (method, func, value) => {
  let store = storeFactory();

  rejectPromise(method);

  return store.dispatch(func()).then(() => {
    const newState = store.getState();
    expect(newState.toasts.length).toBe(value);
  });
};

/**
 *
 * @param {Enzyme} shallowwrapper - shallow wrapper that is nested in provider & react-router
 * @returns {ShallowWrapper} - Our component code that is exposed from the nesting
 *
 */
export const diveDeep = shallowwrapper =>
  shallowwrapper
    .dive()
    .dive()
    .dive()
    .dive()
    .dive()
    .dive();
