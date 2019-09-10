import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from './auth/reducers';
import { productReducer } from './product/reducers';
import { staticCategoryReducer } from './category/static/reducers';
import { dynamicCategoryReducer } from './category/dynamic/reducers';
import { staticGroupReducer } from './group/static/reducers';
import { staticProductReducer } from './product/static/reducers';
import { staticClassReducer } from './Class/static/reducers';
import {dynamicClassReducer} from './class/dynamic/reducers';


const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer,
    staticCategories: staticCategoryReducer,
    dynamicCategories: dynamicCategoryReducer,
    staticGroupReducer: staticGroupReducer,
    staticProducts: staticProductReducer,
    staticClassReducer: staticClassReducer,
    dynamicClassReducer: dynamicClassReducer,
});

export type AppState = ReturnType<typeof rootReducers>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);

    const store = createStore(
        rootReducers,
        composeWithDevTools(middleWareEnhancer)
    );

    return store;
};
