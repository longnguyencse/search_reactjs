import {Action, AnyAction} from 'redux';
import {
    LIST_DYNAMIC_PRODUCT, 
    CREATE_MULTI_DYNAMIC_PRODUCTS, 
    UPDATE_DYNAMIC_PRODUCT,
    REMOVE_DYNAMIC_PRODUCT,
} from '../../../constants/product';

import { DEFAULT_PAGE,DEFAULT_SIZE } from '../../../constants';

import { Product, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

import API from '../../../services/API';
import axios from 'axios';

// All function use to dispatch
export const _list = (total: number, totalPage: number, currentPage: number, products: Product[]): ActionType => {
    return {
        type: LIST_DYNAMIC_PRODUCT,
        total,
        totalPage,
        currentPage,
        payload: products
    }
}

export const _createMulti = (products: Product[]): ActionType => {
    return {
        type: CREATE_MULTI_DYNAMIC_PRODUCTS,
        payload: products
    }
}

export const _update = (productId: number | string, product: Product): ActionType => {
    return {
        type: UPDATE_DYNAMIC_PRODUCT,
        id: productId,
        payload: product,
    }
}

export const _remove = (productId: number | string): ActionType => {
    return {
        type: REMOVE_DYNAMIC_PRODUCT,
        id: productId,
    }
}
// All function use to dispatch

// All function use Component call
export const list = (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProducts = await executeList(page, size);

    if(newProducts){
        const {total, totalPage, currentPage, products} = newProducts;

        dispatch(
            _list(total, totalPage, currentPage, products)
        );
    }
}

export const createMulti = (products: Product[]): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProducts = await executeCreateMulti(products);
    dispatch(
        _createMulti(newProducts)
    );
}

export const update = (productId: number | string, updatedProduct: Product): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProduct = await executeUpdate(productId, updatedProduct);
    dispatch(
        _update(productId, newProduct)
    );
}

export const remove = (productId: number | string): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProductKey = await executeRemove(productId);
    dispatch(
        _remove(productId)
    );
}

// All function to execute logic
export async function executeList(page: number | null = DEFAULT_PAGE, size: number | null = DEFAULT_SIZE){
    try{
        const urlGetList = API.apiProduct + `?page=${page}&size=${size}`
        const response: any = await axios.get(urlGetList);

        const responseData: any = response.data.data;

        return {
            total: responseData.total,
            totalPage: responseData.totalPage,
            currentPage: responseData.page,
            products: responseData.data
        };
    }
    catch(ex){
        console.error(ex);
    }
}

async function executeCreateMulti(newProducts: Product[]){
    try{
        const localS = new LocalStorage();

        const urlSaveAll = API.apiProduct;
        const response: any = await axios.post(urlSaveAll, newProducts);

        if(response){
            await localS.setItem('products', null);

            return newProducts;
        }

        return response.data;
    }
    catch(ex){
        console.error(ex);
    }
}

async function executeUpdate(productId: number | string, updatedProduct: Product){
    try{
        const urlUpdate = API.apiProduct;

        updatedProduct.id = productId;
        
        const updateData = [
            updatedProduct
        ];

        const response: any = await axios.put(urlUpdate, updateData);

        const responseData = response.data.data;
        
        return responseData[0];
    }
    catch(ex){
        console.error(ex);
    }
}

export async function executeRemove(productId: number | string){
    try{
        const urlDelete = API.apiProduct;

        const deleteData = [
            {
                id: productId
            }
        ];

        const response: any = await axios.delete(urlDelete, {
            data: deleteData
        });

        const responseData = response.data.data;

        if(responseData){
            return productId;
        }
        return false;
    }
    catch(ex){
        console.error(ex);
    }
}

export async function executeGet(productId: number | string){
    try{
        const urlGet = API.apiProduct + `/${productId}`;

        const response: any = await axios.get(urlGet);

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}
// All function to execute logic