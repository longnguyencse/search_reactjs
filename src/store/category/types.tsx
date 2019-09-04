import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from "../constants";

export interface Category {
    id?: number | string,
    key?: number | string,
    code?: string,
    name?: string,
    note?: string
}

export interface ListAction {
    type: typeof LIST,
    payload: Category[]
}

export interface GetAction {
    type: typeof GET,
    payload: Category
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI,
    payload: Category[]
}

export interface UpdateAction {
    type: typeof UPDATE,
    payload: Category,
    key: number,
}

export interface DeleteAction {
    type: typeof DELETE,
    payload: Category,
    key: number,
}

export type CategoryActionType = ListAction | GetAction | CreateMultiAction | UpdateAction | DeleteAction;