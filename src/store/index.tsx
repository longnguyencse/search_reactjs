import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

import {authReducer} from './auth/reducers';
import {productReducer} from './product/reducers';
import {staticCategoryReducer} from './category/static/reducers';
import {dynamicCategoryReducer} from './category/dynamic/reducers';
import {staticGroupReducer} from './group/static/reducers';
import {staticProductReducer} from './product/static/reducers';
import {dynamicProductReducer} from './product/dynamic/reducers';
import {staticClassReducer} from './class/static/reducers';
import {dynamicClassReducer} from './class/dynamic/reducers';
import {dynamicGroupReducer} from './group/dynamic/reducers';
import {staticSupplierReducer} from './supplier/static/reducers';
import {dynamicSupplierReducer} from './supplier/dymamic/reducers';


const rootReducers = combineReducers({
    auth: authReducer,
    products: productReducer,
    staticCategories: staticCategoryReducer,
    dynamicCategories: dynamicCategoryReducer,
    staticGroupReducer: staticGroupReducer,
    dynamicGroupReducer: dynamicGroupReducer,
    staticProducts: staticProductReducer,
    dynamicProducts: dynamicProductReducer,
    staticClassReducer: staticClassReducer,
    dynamicClassReducer: dynamicClassReducer,
    staticSupplierReducer: staticSupplierReducer,
    dynamicSupplierReducer: dynamicSupplierReducer
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
