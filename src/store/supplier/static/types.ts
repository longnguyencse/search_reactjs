import {
    CREATE_MULTI_STATIC_SUPPLIER,
    LIST_STATIC_SUPPLIER,
    REMOVE_STATIC_SUPPLIER,
    UPDATE_STATIC_SUPPLIER
} from "../../../constants/supplier";


export interface Supplier {
    key?: number | string,
    code: string,
    name: string,
    "address": string,
    "phone": string,
    "email": string
}

export interface ListAction {
    type: typeof LIST_STATIC_SUPPLIER,
    payload: Supplier[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_SUPPLIER,
    payload: Supplier[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_SUPPLIER,
    key: number | string,
    payload: Supplier
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_SUPPLIER,
    key: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;


