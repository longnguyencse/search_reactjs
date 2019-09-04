import {Action, AnyAction} from 'redux';
// import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT, AuthenActionType} from './types';
import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from '../constants';
import { Category, CategoryActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../services/LocalStorage';

export const _listCategory = (categories: Category[]): CategoryActionType => {
    return {
        type: LIST,
        payload: categories
    }
}

export const _getCategory = (category: Category): CategoryActionType => {
    return {
        type: GET,
        payload: category
    }
}

export const _createMultiCategory = (categories: Category[]): CategoryActionType => {
    console.log("_createMultiCategory");
    return {
        type: CREATE_MULTI,
        payload: categories
    }
}

export const _updateCategory = (category: Category): CategoryActionType => {
    return {
        type: UPDATE,
        payload: category
    }
}

export const _deleteCategory = (category: Category): CategoryActionType => {
    return {
        type: DELETE,
        payload: category
    }
}

export const createMultiCategory = (categories: {
    code: string,
    name: string
}[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    console.log("createMultiCategory");
    const newCategorys = await executeCreateMultiCategory(categories);
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

async function executeCreateMultiCategory(categories: {
    code: string,
    name: string
}[]){
    console.log("executeCreateMultiCategory");
    const newCategorys = categories.map((value, index) => {
        return {
            ...value,
            id: index + 2
        }
    })
    console.log("executeCreateMultiCategory-getValue", newCategorys)
    return newCategorys;
}

async function executeListCategory(){
    const localS = new LocalStorage();

    const getValue: any  = await localS.getValue('categories');

    let categories = [];

    if(getValue){
        categories = getValue.value;
    }

    return categories;
}