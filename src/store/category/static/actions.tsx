import {Action, AnyAction} from 'redux';
import {
    LIST_STATIC_CATEGORY, 
    CREATE_MULTI_STATIC_CATEGORIES, 
    UPDATE_STATIC_CATEGORY, 
    REMOVE_STATIC_CATEGORY} from '../../../constants/category';
import { Category, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

// All function use to dispatch
export const _list = (categories: Category[]): ActionType => {
    return {
        type: LIST_STATIC_CATEGORY,
        payload: categories
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
        type: UPDATE_STATIC_CATEGORY,
        key: categoryKey,
        payload: category,
    }
}

export const _remove = (categoryKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_CATEGORY,
        key: categoryKey,
    }
}
// All function use to dispatch

// All function use Component call
export const list = (): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategories = await executeList();
    dispatch(
        _list(newCategories)
    );
}

export const createMulti = (categories: Category[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategories = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategories)
    );
}

export const update = (categoryKey: number | string, updatedCategory: Category): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategory = await executeUpdate(categoryKey, updatedCategory);
    dispatch(
        _update(categoryKey, newCategory)
    );
}

export const remove = (categoryKey: number | string): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategoryKey = await executeRemove(categoryKey);
    dispatch(
        _remove(newCategoryKey)
    );
}
// All function use Component call

// All function to execute logic
async function executeList(){
    const localS = new LocalStorage();

    const categories = await localS.getArrayValue('categories');

    return categories;
}

async function executeCreateMulti(newCategories: Category[]){
    const localS = new LocalStorage();
    
    const oldCategories = await localS.getArrayValue('categories');

    const mergeCategories = mergeTwoArrayObject(oldCategories, newCategories);

    await localS.setItem('categories', mergeCategories);

    return newCategories;
}

async function executeUpdate(categoryKey: number | string, updatedCategory: Category){
    const localS = new LocalStorage();

    const categories = await localS.getArrayValue('categories');

    const newCategories = updateArrayObjectByAttribute(categories, "key", categoryKey, updatedCategory);
            
    await localS.setItem('categories', newCategories);

    return updatedCategory;
}

async function executeRemove(categoryKey: number | string){
    const localS = new LocalStorage();

    const categories = await localS.getArrayValue('categories');

    let newCategories = filterArrayObjectByAttribute(categories, "key", categoryKey);

    if(!newCategories.length){
        newCategories = null;
    }

    await localS.setItem('categories', newCategories);

    return categoryKey;
}
// All function to execute logic