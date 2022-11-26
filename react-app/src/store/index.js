import { legacy_createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from "./session";
import account from "./account/account";
import transaction from "./transaction/transaction";
import budget from "./budget/budget";

const rootReducer = combineReducers({
    session,
    account,
    transaction,
    budget,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
    enhancer = applyMiddleware(thunk);
}

if (process.env.NODE_ENV === "development") {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return legacy_createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;

 