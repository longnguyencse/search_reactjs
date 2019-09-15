import {
    CREATE_MULTI_DYNAMIC_ORDERS,
    LIST_DYNAMIC_ORDER,
    REMOVE_DYNAMIC_ORDER,
    UPDATE_DYNAMIC_ORDER,
    GET_PRODUCTS_BELONG_SUPPLIER
} from "../../../constants/order";

export interface Item {
    product: any,
    quantity: number,
    money: number,
    discount: any
}

export interface Order {
    id?: number | string,
    supplierId: number,
    items: Item[]
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_ORDER,
    total: number,
    totalPage: number,
    currentPage: number,
    payload: Order[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_ORDERS,
    payload: Order
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_ORDER,
    key: number | string,
    payload: Order
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_ORDER,
    key: number | string,
}

export interface GetProductsBelongSupplier {
    type: typeof GET_PRODUCTS_BELONG_SUPPLIER,
    payload: any
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction | GetProductsBelongSupplier;


