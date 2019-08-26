import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from "../constants";

export interface Product {
    id?: number | string,
    code?: string,
    name?: string
}

export interface ListAction {
    type: typeof LIST,
    payload: Product[]
}

export interface GetAction {
    type: typeof GET,
    payload: Product
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI,
    payload: Product[]
}

export interface UpdateAction {
    type: typeof UPDATE,
    payload: Product
}

export interface DeleteAction {
    type: typeof DELETE,
    payload: Product
}

export type ProductActionType = ListAction | GetAction | CreateMultiAction | UpdateAction | DeleteAction;