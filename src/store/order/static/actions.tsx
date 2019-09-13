import {Action, AnyAction} from 'redux';
import {
    LIST_STATIC_ORDER, 
    CREATE_MULTI_STATIC_ORDERS, 
    UPDATE_STATIC_ORDER, 
    REMOVE_STATIC_ORDER,
    GET_PRODUCT_FROM_SUPPLIER} from '../../../constants/order';
import { Order, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute, findElementInArrayObjectByAttribute, findAllElementInArrayObjectByAttribute } from '../../../helpers';

// All function use to dispatch
export const _list = (orders: Order[]): ActionType => {
    return {
        type: LIST_STATIC_ORDER,
        payload: orders
    }
}

export const _createMulti = (orders: Order[]): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_ORDERS,
        payload: orders
    }
}

export const _update = (orderKey: number | string, order: Order): ActionType => {
    return {
        type: UPDATE_STATIC_ORDER,
        key: orderKey,
        payload: order,
    }
}

export const _remove = (orderKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_ORDER,
        key: orderKey,
    }
}

export const _getProducts = (products: any): ActionType => {
    return {
        type: GET_PRODUCT_FROM_SUPPLIER,
        payload: products
    };
}
// All function use to dispatch

// All function use Component call
export const list = (): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrders = await executeList();
    dispatch(
        _list(newOrders)
    );
}

export const createMulti = (orders: Order[]): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrders = await executeCreateMulti(orders);
    dispatch(
        _createMulti(newOrders)
    );
}

export const update = (orderKey: number | string, updatedOrder: Order): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrder = await executeUpdate(orderKey, updatedOrder);
    dispatch(
        _update(orderKey, newOrder)
    );
}

export const remove = (orderKey: number | string): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrderKey = await executeRemove(orderKey);
    dispatch(
        _remove(newOrderKey)
    );
}

export const getProducts = (supplierId: number | string): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newProducts = await executeGetProducts(supplierId);
    const newValue = {
        supplierId,
        products: newProducts
    };
    dispatch(
        _getProducts(newValue)
    );
}
// All function use Component call

// All function to execute logic
async function executeList(){
    const localS = new LocalStorage();

    const orders = await localS.getArrayValue('orders');

    return orders;
}

async function executeCreateMulti(newOrders: Order[]){
    const localS = new LocalStorage();
    
    const oldOrders = await localS.getArrayValue('orders');

    const mergeOrders = mergeTwoArrayObject(oldOrders, newOrders);

    await localS.setItem('orders', mergeOrders);

    return newOrders;
}

async function executeUpdate(orderKey: number | string, updatedOrder: Order){
    const localS = new LocalStorage();

    const orders = await localS.getArrayValue('orders');

    const newOrders = updateArrayObjectByAttribute(orders, "key", orderKey, updatedOrder);
            
    await localS.setItem('orders', newOrders);

    return updatedOrder;
}

async function executeRemove(orderKey: number | string){
    const localS = new LocalStorage();

    const orders = await localS.getArrayValue('orders');

    let newOrders = filterArrayObjectByAttribute(orders, "key", orderKey);

    if(!newOrders.length){
        newOrders = null;
    }

    await localS.setItem('orders', newOrders);

    return orderKey;
}

async function executeGetProducts(supplierId: number | string){
    const _products = [
        {
            id: 1,
            supplierId: 1,
            name: "Product 01",
            price: 10000
        },
        {
            id: 2,
            supplierId: 1,
            name: "Product 02",
            price: 20000
        },
        {
            id: 3,
            supplierId: 2,
            name: "Product 03",
            price: 10000
        },
        {
            id: 4,
            supplierId: 3,
            name: "Product 04",
            price: 10000
        },
        {
            id: 5,
            supplierId: 4,
            name: "Product 05",
            price: 10000
        },
        {
            id: 6,
            supplierId: 4,
            name: "Product 06",
            price: 10000
        },
        {
            id: 7,
            supplierId: 5,
            name: "Product 07",
            price: 10000
        },
        {
            id: 8,
            supplierId: 5,
            name: "Product 08",
            price: 15000
        }
    ];

    const products = findAllElementInArrayObjectByAttribute(_products, "supplierId", supplierId);

    return products;
}
// All function to execute logic