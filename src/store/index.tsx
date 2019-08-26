import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import {authReducer} from './auth/reducers';
import {productReducer} from './product/reducers';


const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer
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