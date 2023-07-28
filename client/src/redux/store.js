import thunk from "redux-thunk";
import reducers from "./reducers";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
// import reducers from "./index"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export { store };
