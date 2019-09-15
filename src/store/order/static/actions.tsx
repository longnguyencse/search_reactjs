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

export const remove = (orderKey: number | string): ThunkAction<void, Order[], null, Action<string>> => async dispatch => {
    const newOrderKey = await executeRemove(orderKey);
    dispatch(
        _remove(newOrderKey)
    );
}
// All function use Component call

// All function to execute logic
async function executeList(){
    const localS = new LocalStorage();

    let order:any = await localS.getItemValue('order');

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

    const oldOrder: any = await localS.getItemValue('order');
    const oldItems = oldOrder ? oldOrder.items : [];

    const mergeItems = mergeTwoArrayObject(oldItems, newItems);

    const mergeOrder = {
        supplierId: newOrder.supplierId,
        items: mergeItems
    };

    await localS.setItem('order', mergeOrder);

    return newOrder;
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
// All function to execute logic