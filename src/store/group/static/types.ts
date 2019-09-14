import {
    CREATE_MULTI_STATIC_GROUP,
    LIST_STATIC_GROUP,
    REMOVE_STATIC_GROUP,
    UPDATE_STATIC_GROUP
} from "../../../constants/group";


export interface ProductGroup {
    key?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_STATIC_GROUP,
    payload: ProductGroup[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_STATIC_GROUP,
    payload: ProductGroup[]
}

export interface UpdateAction {
    type: typeof UPDATE_STATIC_GROUP,
    key: number | string,
    payload: ProductGroup
}

export interface DeleteAction {
    type: typeof REMOVE_STATIC_GROUP,
    key: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;


