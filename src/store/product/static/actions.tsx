import {Action, AnyAction} from 'redux';
import {
    LIST_STATIC_PRODUCT, 
    CREATE_MULTI_STATIC_PRODUCTS, 
    UPDATE_STATIC_PRODUCT, 
    REMOVE_STATIC_PRODUCT} from '../../../constants/product';
import { Product, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

// All function use to dispatch
export const _list = (products: Product[]): ActionType => {
    return {
        type: LIST_STATIC_PRODUCT,
        payload: products
    }
}

export const _createMulti = (products: Product[]): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_PRODUCTS,
        payload: products
    }
}

export const _update = (productKey: number | string, product: Product): ActionType => {
    return {
        type: UPDATE_STATIC_PRODUCT,
        key: productKey,
        payload: product,
    }
}

export const _remove = (productKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_PRODUCT,
        key: productKey,
    }
}
// All function use to dispatch

// All function use Component call
export const list = (): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProducts = await executeList();
    dispatch(
        _list(newProducts)
    );
}

export const createMulti = (products: Product[]): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProducts = await executeCreateMulti(products);
    dispatch(
        _createMulti(newProducts)
    );
}

export const update = (productKey: number | string, updatedProduct: Product): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProduct = await executeUpdate(productKey, updatedProduct);
    dispatch(
        _update(productKey, newProduct)
    );
}

export const remove = (productKey: number | string): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProductKey = await executeRemove(productKey);
    dispatch(
        _remove(newProductKey)
    );
}
// All function use Component call

// All function to execute logic
async function executeList(){
    const localS = new LocalStorage();

    const products = await localS.getArrayValue('products');

    return products;
}

async function executeCreateMulti(newProducts: Product[]){
    const localS = new LocalStorage();
    
    const oldProducts = await localS.getArrayValue('products');

    const mergeProducts = mergeTwoArrayObject(oldProducts, newProducts);

    await localS.setItem('products', mergeProducts);

    return newProducts;
}

async function executeUpdate(productKey: number | string, updatedProduct: Product){
    const localS = new LocalStorage();

    const products = await localS.getArrayValue('products');

    const newProducts = updateArrayObjectByAttribute(products, "key", productKey, updatedProduct);
            
    await localS.setItem('products', newProducts);

    return updatedProduct;
}

async function executeRemove(productKey: number | string){
    const localS = new LocalStorage();

    const products = await localS.getArrayValue('products');

    let newProducts = filterArrayObjectByAttribute(products, "key", productKey);

    if(!newProducts.length){
        newProducts = null;
    }

    await localS.setItem('products', newProducts);

    return productKey;
}
// All function to execute logic