import {Action} from 'redux';
import {
    CREATE_MULTI_DYNAMIC_SUPPLIERS,
    LIST_DYNAMIC_SUPPLIER,
    REMOVE_DYNAMIC_SUPPLIER,
    UPDATE_DYNAMIC_SUPPLIER,
} from '../../../constants/supplier';
import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../../constants';
import {ActionType, Supplier} from './types';
import {ThunkAction} from 'redux-thunk';
import LocalStorage from '../../../services/LocalStorage';
import API from '../../../services/API';
import axios from 'axios';

const mapKey = 'suppliers';

// All function use Component call
export const list = (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
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
        const urlGetList = API.apiSupplier + `?page=${page}&size=${size}`
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
export const _list = (total: number, totalPage: number, currentPage: number, categories: Supplier[]): ActionType => {
    return {
        type: LIST_DYNAMIC_SUPPLIER,
        total,
        totalPage,
        currentPage,
        payload: categories
    }
};


export const createMulti = (categories: Supplier[]): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
    const newCategories = await executeCreateMulti(categories);
    dispatch(
        _createMulti(newCategories)
    );
};

async function executeCreateMulti(newCategories: Supplier[]) {
    try {
        const localS = new LocalStorage();

        const urlSaveAll = API.apiSupplier;
        const response: any = await axios.post(urlSaveAll, newCategories);

        if (response) {
            await localS.setItem(mapKey, null);

            return newCategories;
        }

        return response.data;
    } catch (ex) {
        console.error(ex);
    }
}

export const _createMulti = (data: Supplier[]): ActionType => {
    return {
        type: CREATE_MULTI_DYNAMIC_SUPPLIERS,
        payload: data
    }
};

export const update = (categoryId: number | string, updatedCategory: Supplier): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
    const newCategory = await executeUpdate(categoryId, updatedCategory);
    dispatch(
        _update(categoryId, newCategory)
    );
};

async function executeUpdate(categoryId: number | string, updatedCategory: Supplier) {
    try {
        const urlUpdate = API.apiSupplier;

        updatedCategory.id = categoryId;

        const updateData = [
            updatedCategory
        ];

        const response: any = await axios.put(urlUpdate, updateData);

        const responseData = response.data.data;

        return responseData[0];
    } catch (ex) {
        console.error(ex);
    }
}

export const _update = (dataId: number | string, data: Supplier): ActionType => {
    return {
        type: UPDATE_DYNAMIC_SUPPLIER,
        id: dataId,
        payload: data,
    }
};

export const remove = (categoryId: number | string): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
    const newCategoryKey = await executeRemove(categoryId);
    dispatch(
        _remove(categoryId)
    );
};

export async function executeRemove(categoryId: number | string) {
    try {
        const urlDelete = API.apiSupplier;

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
        type: REMOVE_DYNAMIC_SUPPLIER,
        id: dataId,
    }
};


export async function executeGet(categoryId: number | string) {
    try {
        const urlGet = API.apiSupplier + `/${categoryId}`;

        const response: any = await axios.get(urlGet);

        const responseData: any = response.data.data;

        return responseData;
    } catch (ex) {
        console.log(ex);
    }
}

// All function to execute logic
