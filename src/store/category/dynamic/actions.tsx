import {Action, AnyAction} from 'redux';
import {
    LIST_DYNAMIC_CATEGORY, 
    CREATE_MULTI_DYNAMIC_CATEGORIES, 
    UPDATE_DYNAMIC_CATEGORY,
    REMOVE_DYNAMIC_CATEGORY,
} from '../../../constants/category';

import { DEFAULT_PAGE,DEFAULT_SIZE } from '../../../constants';

import { Category, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

import API from '../../../services/API';
import axios from 'axios';
import { number } from 'prop-types';

// All function use to dispatch
export const _list = (total: number, totalPage: number, currentPage: number, categories: Category[]): ActionType => {
    return {
        type: LIST_DYNAMIC_CATEGORY,
        total,
        totalPage,
        currentPage,
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
export const list = (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategories = await executeList(page, size);

    if(newCategories){
        const {total, totalPage, currentPage, categories} = newCategories;

        dispatch(
            _list(total, totalPage, currentPage, categories)
        );
    }
}

export const createMulti = (categories: Category[]): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategories = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategories)
    );
}

export const update = (categoryId: number | string, updatedCategory: Category): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategory = await executeUpdate(categoryId, updatedCategory);
    dispatch(
        _update(categoryId, newCategory)
    );
}

export const remove = (categoryId: number | string): ThunkAction<void, Category[], null, Action<string>> => async dispatch => {
    const newCategoryKey = await executeRemove(categoryId);
    dispatch(
        _remove(categoryId)
    );
}

// All function to execute logic
async function executeList(page: number | null = DEFAULT_PAGE, size: number | null = DEFAULT_SIZE){
    try{
        const urlGetList = API.apiCategory + `?page=${page}&size=${size}`
        const response: any = await axios.get(urlGetList);

        const responseData: any = response.data.data;

        return {
            total: responseData.total,
            totalPage: responseData.totalPage,
            currentPage: responseData.page,
            categories: responseData.data
        };
    }
    catch(ex){
        console.error(ex);
    }
}

async function executeCreateMulti(newCategories: Category[]){
    try{
        const localS = new LocalStorage();

        const urlSaveAll = API.apiCategory;
        const response: any = await axios.post(urlSaveAll, newCategories);

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

async function executeUpdate(categoryId: number | string, updatedCategory: Category){
    try{
        const urlUpdate = API.apiCategory;

        updatedCategory.id = categoryId;
        
        const updateData = [
            updatedCategory
        ];

        const response: any = await axios.put(urlUpdate, updateData);

        const responseData = response.data.data;
        
        return responseData[0];
    }
    catch(ex){
        console.error(ex);
    }
}

export async function executeRemove(categoryId: number | string){
    try{
        const urlDelete = API.apiCategory;

        const deleteData = [
            {
                id: categoryId
            }
        ];

        const response: any = await axios.delete(urlDelete, {
            params: deleteData
        });

        const responseData = response.data.data;

        if(responseData){
            return categoryId;
        }
        return false;
    }
    catch(ex){
        console.error(ex);
    }
}

export async function executeGet(categoryId: number | string){
    try{
        const urlGet = API.apiCategory + `/${categoryId}`;

        const response: any = await axios.get(urlGet);

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}
// All function to execute logic