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
const store = createStoreWithFirebase(rootReducer, initialState);

export default store;
