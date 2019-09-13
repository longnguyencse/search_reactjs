import {
    CREATE_MULTI_DYNAMIC_SUPPLIERS,
    LIST_DYNAMIC_SUPPLIER,
    REMOVE_DYNAMIC_SUPPLIER,
    UPDATE_DYNAMIC_SUPPLIER
} from "../../../constants/supplier";

export interface Supplier {
    id?: number | string,
    code: string,
    name: string,
    "address": string,
    "phone": string,
    "email": string
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_SUPPLIER,
    total: number,
    totalPage: number,
    currentPage: number,
    payload: Supplier[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_SUPPLIERS,
    payload: Supplier[]
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_SUPPLIER,
    id: number | string,
    payload: Supplier
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_SUPPLIER,
    id: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;
