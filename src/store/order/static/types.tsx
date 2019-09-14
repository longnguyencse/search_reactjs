import {
    CREATE_MULTI_STATIC_ORDERS,
    LIST_STATIC_ORDER,
    REMOVE_STATIC_ORDER,
    UPDATE_STATIC_ORDER,
} from "../../../constants/order";

export interface Item {
    product: any,
    quantity: number,
    money: number,
    discount: any
}

export interface Order {
    key?: number | string,
    supplierId: number,
    items: Item[]
}

export interface ListAction {
    type: typeof LIST_STATIC_ORDER,
    payload: Order[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_ORDERS,
    payload: Order[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_ORDER,
    key: number | string,
    payload: Order
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_ORDER,
    key: number | string,
}



export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;


