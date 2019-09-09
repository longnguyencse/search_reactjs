import {
    CREATE_MULTI_STATIC_CLASS,
    LIST_STATIC_CLASS,
    REMOVE_STATIC_CLASS,
    UPDATE_STATIC_CLASS
} from "../../../constants/class";


export interface Class {
    key?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_STATIC_CLASS,
    payload: Class[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_CLASS,
    payload: Class[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_CLASS,
    key: number | string,
    payload: Class
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_CLASS,
    key: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;


