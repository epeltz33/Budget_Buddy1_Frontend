import session from './session';
import { combineReducers, configureStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import account from './account';
import budget from './budget';
import transaction from './transaction';
import category from './category';

const rootReducer = combineReducers({ // this is where all the reducers are combined into one reducer
    session, account, budget, transaction, category
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // documentation for https://github.com/zalmoxisus/redux-devtools-extension  
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));

}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;