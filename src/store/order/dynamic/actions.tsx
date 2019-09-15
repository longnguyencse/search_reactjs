import {Action, AnyAction} from 'redux';
import {
    GET_PRODUCTS_BELONG_SUPPLIER, 
    CREATE_MULTI_DYNAMIC_ORDERS,
    LIST_DYNAMIC_ORDER,
} from '../../../constants/order';

import { Order, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

import API from '../../../services/API';
import axios from 'axios';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '../../../constants';

// All function use to dispatch
export const _getProductsBelongSupplier = (products: any): ActionType => {
    return {
        type: GET_PRODUCTS_BELONG_SUPPLIER,
        payload: products
    };
}

export const _list = (total: number, totalPage: number, currentPage: number, orders: Order[]): ActionType => {
    return {
        type: LIST_DYNAMIC_ORDER,
        total,
        totalPage,
        currentPage,
        payload: orders
    }
}


export const _createMulti = (order: Order): ActionType => {
    return {
        type: CREATE_MULTI_DYNAMIC_ORDERS,
        payload: order
    }
}
// All function use to dispatch

// All function use Component call
export const getProductsBelongSupplier = (supplierId: number | string): ThunkAction<void, [], null, Action<string>> => async dispatch => {
    const newProducts = await exeGetProductsBelongSupplier(supplierId);
    const newValue = {
        supplierId,
        products: newProducts
    };
    dispatch(
        _getProductsBelongSupplier(newValue)
    );
}

export const list = (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE, options: any): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    console.log("list", options);
    const newOrders = await executeList(page, size, options);

    if(newOrders){
        const {total, totalPage, currentPage, orders} = newOrders;

        dispatch(
            _list(total, totalPage, currentPage, orders)
        );
    }
}

export const createMulti = (order: Order): ThunkAction<void, Order, null, Action<string>> => async dispatch => {
    const newProducts = await executeCreateMulti(order);
    dispatch(
        _createMulti(newProducts)
    );
}
// All function use Component call

// All function to execute logic
export async function exeGetProductsBelongSupplier(supplierId: number | string){
    try{
        const url = API.apiSupplierProduct + '/products';

        const params = {
            supplier_is: supplierId
        };

        const response: any = await axios.get(url, {
            params
        });

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function exeGetSuppierProductDetail(supplierId: number | string, productId: number | string){
    try{
        const url = API.apiSupplierProductDetail;

        const params = {
            supplier_id: supplierId,
            product_id: productId
        };

        const response: any = await axios.get(url, {
            params
        });

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function executeList(page: number | null = DEFAULT_PAGE, size: number | null = DEFAULT_SIZE, options: any){
    try{
        console.log("executeList", options);
        const url = API.apiProductOrder;

        const params = {
            page,
            size,
            filter: options.status
        };
        const response: any = await axios.get(url, {
            params
        });

        const responseData: any = response.data.data;

        return {
            total: responseData.total,
            totalPage: responseData.totalPage,
            currentPage: responseData.page,
            orders: responseData.data
        };
    }
    catch(ex){
        console.error(ex);
    }
}

async function executeCreateMulti(newOrder: Order){
    try{
        const localS = new LocalStorage();

        const urlSaveAll = API.apiProductOrder;
        const response: any = await axios.post(urlSaveAll, newOrder);

        if(response){
            await localS.setItem('order', null);
        }

        return response.data;
    }
    catch(ex){
        console.error(ex);
    }
}

export async function executeChangeStatus(order: Order[], typeChange: string){
    try{
        const url = API.apiProductOrder + '/update-status';

        const params = {
            status: typeChange
        };
        const response: any = await axios.put(url, order, {
            params
        });

        const responseData: any = response.data.data;
        
        return responseData;
    }
    catch(ex){
        console.error(ex);
    }
}
// All function to execute logic