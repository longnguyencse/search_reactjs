import {
    CREATE_MULTI_DYNAMIC_CLASSES,
    LIST_DYNAMIC_CLASS,
    REMOVE_DYNAMIC_CLASS,
    UPDATE_DYNAMIC_CLASS
} from "../../../constants/class";

export interface Class {
    id?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_CLASS,
    total: number,
    totalPage: number,
    currentPage: number,
    payload: Class[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_CLASSES,
    payload: Class[]
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_CLASS,
    id: number | string,
    payload: Class
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_CLASS,
    id: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;
