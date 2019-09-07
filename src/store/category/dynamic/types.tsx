import {
    LIST_DYNAMIC_CATEGORY,
    CREATE_MULTI_DYNAMIC_CATEGORIES,
    UPDATE_DYNAMIC_CATEGORY,
    REMOVE_DYNAMIC_CATEGORY
} from "../../constants";

export interface Category {
    id?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_CATEGORY,
    payload: Category[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_CATEGORIES,
    payload: Category[]
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_CATEGORY,
    id: number | string,
    payload: Category
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_CATEGORY,
    id: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;