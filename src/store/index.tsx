import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import {authReducer} from './auth/reducers';


const rootReducers = combineReducers({
    auth: authReducer,
});

export type AppState = ReturnType<typeof rootReducers>;

export default function configureStore(){
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducers,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
};