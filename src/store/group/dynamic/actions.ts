import {Action} from 'redux';
import {
    CREATE_MULTI_DYNAMIC_GROUPS,
    LIST_DYNAMIC_GROUP,
    REMOVE_DYNAMIC_GROUP,
    UPDATE_DYNAMIC_GROUP,
} from '../../../constants/group';
import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../../constants';
import {ActionType, ProductGroup} from './types';
import {ThunkAction} from 'redux-thunk';
import LocalStorage from '../../../services/LocalStorage';
import API from '../../../services/API';
import axios from 'axios';

// All function use Component call
export const list = (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const data = await executeList(page, size);

    if (data) {
        const {total, totalPage, currentPage, categories} = data;

        dispatch(
            _list(total, totalPage, currentPage, categories)
        );
    }
};

// All function to execute logic
async function executeList(page: number | null = DEFAULT_PAGE, size: number | null = DEFAULT_SIZE) {
    try {
        const urlGetList = API.apiGroup + `?page=${page}&size=${size}`
        const response: any = await axios.get(urlGetList);

        const responseData: any = response.data.data;

        return {
            total: responseData.total,
            totalPage: responseData.totalPage,
            currentPage: responseData.page,
            categories: responseData.data
        };
    } catch (ex) {
        console.error(ex);
    }
}

// All function use to dispatch
export const _list = (total: number, totalPage: number, currentPage: number, categories: ProductGroup[]): ActionType => {
    return {
        type: LIST_DYNAMIC_GROUP,
        total,
        totalPage,
        currentPage,
        payload: categories
    }
};


export const createMulti = (categories: ProductGroup[]): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const newCategories = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategories)
    );
};

async function executeCreateMulti(newCategories: ProductGroup[]) {
    try {
        const localS = new LocalStorage();

        const urlSaveAll = API.apiGroup;
        const response: any = await axios.post(urlSaveAll, newCategories);

        if (response) {
            await localS.setItem('groups', null);

            return newCategories;
        }

        return response.data;
    } catch (ex) {
        console.error(ex);
    }
}

export const _createMulti = (data: ProductGroup[]): ActionType => {
    return {
        type: CREATE_MULTI_DYNAMIC_GROUPS,
        payload: data
    }
};

export const update = (categoryId: number | string, updatedCategory: ProductGroup): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const newCategory = await executeUpdate(categoryId, updatedCategory);
    console.log('update, new catewgory', newCategory);
    console.log('categoryId', categoryId);
    dispatch(
        _update(categoryId, newCategory)
    );
};

async function executeUpdate(categoryId: number | string, updatedCategory: ProductGroup) {
    try {
        const urlUpdate = API.apiGroup;

        updatedCategory.id = categoryId;

        const updateData = [
            updatedCategory
        ];

        const response: any = await axios.put(urlUpdate, updateData);

        const responseData = response.data.data;
        console.log('respon ', responseData);
        return responseData[0];
    } catch (ex) {
        console.error(ex);
    }
}

export const _update = (dataId: number | string, data: ProductGroup): ActionType => {
    return {
        type: UPDATE_DYNAMIC_GROUP,
        id: dataId,
        payload: data,
    }
};

export const remove = (categoryId: number | string): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const newCategoryKey = await executeRemove(categoryId);
    dispatch(
        _remove(categoryId)
    );
};

export async function executeRemove(categoryId: number | string) {
    try {
        const urlDelete = API.apiGroup;

        const deleteData = [
            {
                id: categoryId
            }
        ];

        const response: any = await axios.delete(urlDelete, {
            data: deleteData
        });

        const responseData = response.data.data;

        if (responseData) {
            return categoryId;
        }
        return false;
    } catch (ex) {
        console.error(ex);
    }
}

export const _remove = (dataId: number | string): ActionType => {
    return {
        type: REMOVE_DYNAMIC_GROUP,
        id: dataId,
    }
};


export async function executeGet(categoryId: number | string) {
    try {
        const urlGet = API.apiGroup + `/${categoryId}`;

        const response: any = await axios.get(urlGet);

        const responseData: any = response.data.data;

        return responseData;
    } catch (ex) {
        console.log(ex);
    }
}

// All function to execute logic
