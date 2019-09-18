import {Action, AnyAction} from 'redux';
import {
    LIST_STATIC_ORDER, 
    CREATE_MULTI_STATIC_ORDERS, 
    UPDATE_STATIC_ORDER, 
    REMOVE_STATIC_ORDER,
} from '../../../constants/order';
import { Order, ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute, findElementInArrayObjectByAttribute, findAllElementInArrayObjectByAttribute } from '../../../helpers';

// All function use to dispatch
export const _list = (order: Order): ActionType => {
    return {
        type: LIST_STATIC_ORDER,
        payload: order
    }
}

export const _createMulti = (order: Order): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_ORDERS,
        payload: order
    }
}

export const _update = (productId: number | string, order: Order): ActionType => {
    return {
        type: UPDATE_STATIC_ORDER,
        key: productId,
        payload: order,
    }
}

export const _remove = (productId: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_ORDER,
        key: productId,
    }
}
// All function use to dispatch

// All function use Component call
export const list = (): ThunkAction<void, Order, null, Action<string>> => async dispatch => {
    const newOrder: any = await executeList();
    dispatch(
        _list(newOrder)
    );
}

export const createMulti = (order: Order): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrder = await executeCreateMulti(order);
    dispatch(
        _createMulti(newOrder)
    );
}

export const update = (orderKey: number | string, updatedOrder: Order): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrder = await executeUpdate(orderKey, updatedOrder);
    dispatch(
        _update(orderKey, newOrder)
    );
}

export const remove = (productId: number | string): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    await executeRemove(productId);
    dispatch(
        _remove(productId)
    );
}
// All function use Component call

// All function to execute logic
async function executeList(){
    const localS = new LocalStorage();

    const orderArr:any = await localS.getArrayValue('order');
    console.log(orderArr)
    let order = orderArr[0];

    if(!order){
        order = {
            supplierId: 0,
            items: []
        };
    }

    return order;
}

async function executeCreateMulti(newOrder: Order){
    const localS = new LocalStorage();
    
    const newItems = newOrder.items;

    const oldOrderArr: any = await localS.getArrayValue('order');
    const oldOrder = oldOrderArr[0];

    const oldItems = oldOrder ? oldOrder.items : [];

    const mergeItems = mergeTwoArrayObject(oldItems, newItems);

    const mergeOrder = {
        supplierId: newOrder.supplierId,
        items: mergeItems
    };

    const mergeOrderArr = [mergeOrder];

    await localS.setItem('order', mergeOrderArr);

    return newOrder;
}

async function executeUpdate(orderKey: number | string, updatedOrder: Order){
    const localS = new LocalStorage();

    const orders = await localS.getArrayValue('orders');

    const newOrders = updateArrayObjectByAttribute(orders, "key", orderKey, updatedOrder);
            
    await localS.setItem('orders', newOrders);

    return updatedOrder;
}

async function executeRemove(productId: number | string){
    const localS = new LocalStorage();

    const orderArr: any = await localS.getArrayValue('order');
    let order = orderArr[0];

    const oldItems = order ? order.items : [];
    const newItems = filterArrayObjectByAttribute(oldItems, 'productId', productId);
    // let newOrders = filterArrayObjectByAttribute(orders, "key", orderKey);

    if(!newItems.length){
        order = null;
    }

    await localS.setItem('order', order);

    return productId;
}
// All function to execute logic