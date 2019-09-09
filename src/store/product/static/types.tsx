import {
    LIST_STATIC_PRODUCT, 
    CREATE_MULTI_STATIC_PRODUCTS, 
    UPDATE_STATIC_PRODUCT, 
    REMOVE_STATIC_PRODUCT
} from "../../../constants/product";

export interface Product {
    key?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_STATIC_PRODUCT,
    payload: Product[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_PRODUCTS,
    payload: Product[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_PRODUCT,
    key: number | string,
    payload: Product
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_PRODUCT,
    key: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;