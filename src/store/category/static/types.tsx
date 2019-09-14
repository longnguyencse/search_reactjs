import {
    LIST_STATIC_CATEGORY, 
    CREATE_MULTI_STATIC_CATEGORIES, 
    UPDATE_STATIC_CATEGORY, 
    REMOVE_STATIC_CATEGORY
} from "../../../constants/category";

export interface Category {
    key?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_STATIC_CATEGORY,
    payload: Category[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_CATEGORIES,
    payload: Category[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_CATEGORY,
    key: number | string,
    payload: Category
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_CATEGORY,
    key: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;