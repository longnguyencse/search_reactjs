import {
    LIST_DYNAMIC_PRODUCT, 
    CREATE_MULTI_DYNAMIC_PRODUCTS, 
    UPDATE_DYNAMIC_PRODUCT, 
    REMOVE_DYNAMIC_PRODUCT
} from "../../../constants/product";

export interface Product {
    id?: number | string,
    code: string,
    name: string,
    note: string,
    categoryId: any,
    groupId: any
    classId: any
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_PRODUCT,
    total: number,
    totalPage: number,
    currentPage: number,
    payload: Product[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_PRODUCTS,
    payload: Product[]
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_PRODUCT,
    id: number | string,
    payload: Product
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_PRODUCT,
    id: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;