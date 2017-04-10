import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import tokenVerify from '../middleware/thunk_used/token_verify';

const configureStore = preloadedState => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
        thunkMiddleware.withExtraArgument(tokenVerify)
    )
);

export default configureStore;
