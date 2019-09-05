import {Action, AnyAction} from 'redux';
import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from '../../constants';
import { Category, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';

// All function use to dispatch

export const _list = (categories: Category[]): ActionType => {
    return {
        type: LIST,
        payload: categories
    }
}

export const _get = (category: Category): ActionType => {
    return {
        type: GET,
        payload: category
    }
}

export const _createMulti = (categories: Category[]): ActionType => {
    console.log("_createMultiCategory");
    return {
        type: CREATE_MULTI,
        payload: categories
    }
}

export const _update = (categoryKey: number | string, category: Category): ActionType => {
    return {
        type: UPDATE,
        key: categoryKey,
        payload: category,
    }
}

export const _delete = (categoryKey: number | string): ActionType => {
    return {
        type: DELETE,
        key: categoryKey,
    }
}
// All function use to dispatch

// All function use Component call
export const createMulti = (categories: {
    code: string,
    name: string,
    note: string
}[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategorys = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategorys)
    );
}

export const list = (): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategorys = await executeList();
    dispatch(
        _list(newCategorys)
    );
}
// All function use Component call

// All function to execute logic
async function executeCreateMulti(categories: {
    code: string,
    name: string,
    note: string
}[]){
    const newCategorys = categories.map((value, index) => {
        return {
            ...value,
            key: 1
        }
    })
    return newCategorys;
}

async function executeList(){
    const localS = new LocalStorage();

    const getValue: any  = await localS.getValue('categories');

    let categories = [];

    if(getValue){
        categories = getValue.value;
    }

    return categories;
}
// All function to execute logic