import { combineReducers, createStore, compose } from "redux";
import { reactReduxFirebase, firebaseStateReducer } from "react-redux-firebase";
import firebaseConfig from "./firebaseConfig";

const reduxFirebaseConfig = { userProfile: "users" };

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
});

const initialState = {};
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
