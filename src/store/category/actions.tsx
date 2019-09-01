import {Action, AnyAction} from 'redux';
// import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT, AuthenActionType} from './types';
import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from '../constants';
import { Category, CategoryActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import API from '../../services/API';

import axios from 'axios';

export const _listCategory = (products: Category[]): CategoryActionType => {
    return {
        type: LIST,
        payload: products
    }
}

export const _getCategory = (product: Category): CategoryActionType => {
    return {
        type: GET,
        payload: product
    }
}

export const _createMultiCategory = (products: Category[]): CategoryActionType => {
    console.log("_createMultiCategory");
    return {
        type: CREATE_MULTI,
        payload: products
    }
}

export const _updateCategory = (product: Category): CategoryActionType => {
    return {
        type: UPDATE,
        payload: product
    }
}

export const _deleteCategory = (product: Category): CategoryActionType => {
    return {
        type: DELETE,
        payload: product
    }
}

export const createMultiCategory = (products: {
    code: string,
    name: string
}[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    console.log("createMultiCategory");
    const newCategorys = await executeCreateMultiCategory(products);
    dispatch(
        _createMultiCategory(newCategorys)
    );
}

export const listCategory = (): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategorys = await executeListCategory();
    dispatch(
        _listCategory(newCategorys)
    );
}

async function executeCreateMultiCategory(products: {
    code: string,
    name: string
}[]){
    console.log("executeCreateMultiCategory");
    const newCategorys = products.map((value, index) => {
        return {
            ...value,
            id: index + 2
        }
    })
    console.log("executeCreateMultiCategory-getValue", newCategorys)
    return newCategorys;
}

async function executeListCategory(){
    let products = [];
    const i = 0;
    // for (let i = 0; i < 5; i++) {
        products.push({
            key: i,
            id: i,
            productName: `tenSanPham-${i}`,
            productCode:  `maSanPham-${i}`,
            status: "Huy"
        })
    // }
    return products;
}