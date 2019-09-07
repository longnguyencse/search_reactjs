import {Action, AnyAction} from 'redux';
import {
    LIST_DYNAMIC_CATEGORY, 
    CREATE_MULTI_DYNAMIC_CATEGORIES, 
    UPDATE_DYNAMIC_CATEGORY,
    REMOVE_DYNAMIC_CATEGORY} from '../../constants';
import { Category, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

import API from '../../../services/API';
import axios from 'axios';

// All function use to dispatch
export const _list = (categories: Category[]): ActionType => {
    return {
        type: LIST_DYNAMIC_CATEGORY,
        payload: categories
    }
}

export const _createMulti = (categories: Category[]): ActionType => {
    return {
        type: CREATE_MULTI_DYNAMIC_CATEGORIES,
        payload: categories
    }
}

export const _update = (categoryId: number | string, category: Category): ActionType => {
    return {
        type: UPDATE_DYNAMIC_CATEGORY,
        id: categoryId,
        payload: category,
    }
}

export const _remove = (categoryId: number | string): ActionType => {
    return {
        type: REMOVE_DYNAMIC_CATEGORY,
        id: categoryId,
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

// All function to execute logic
async function executeCreateMulti(newCategories: Category[]){

    try{
        const localS = new LocalStorage();
        const response: any = await axios.post(API.apiCategory, newCategories);

        if(response){
            await localS.setItem('categories', null);

            return newCategories;
        }

        return response.data;
    }
    catch(ex){
        console.error(ex);
    }
}
// All function to execute logic