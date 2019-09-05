import {Action, AnyAction} from 'redux';
import {LIST_STATIC_CATEGORY, GET, CREATE_MULTI_STATIC_CATEGORIES, UPDATE, DELETE} from '../../constants';
import { Category, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';

// All function use to dispatch

export const _list = (categories: Category[]): ActionType => {
    return {
        type: LIST_STATIC_CATEGORY,
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
    return {
        type: CREATE_MULTI_STATIC_CATEGORIES,
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
export const createMulti = (categories: Category[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategories = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategories)
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
async function executeCreateMulti(newCategories: Category[]){
    const localS = new LocalStorage();
    
    const oldCategories = await localS.getArrayValue('categories');

    const mergeCategories = oldCategories.concat(newCategories);

    await localS.setItem('categories', mergeCategories);

    return newCategories;
}

async function executeList(){
    const localS = new LocalStorage();

    const categories = await localS.getArrayValue('categories');

    return categories;
}
// All function to execute logic