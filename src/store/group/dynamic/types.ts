import {
    CREATE_MULTI_DYNAMIC_GROUPS,
    LIST_DYNAMIC_GROUP,
    REMOVE_DYNAMIC_GROUP,
    UPDATE_DYNAMIC_GROUP
} from "../../../constants/group";


export interface ProductGroup {
    id?: number | string,
    code: string,
    name: string,
    note: string
}

export interface ListAction {
    type: typeof LIST_DYNAMIC_GROUP,
    total: number,
    totalPage: number,
    currentPage: number,
    payload: ProductGroup[]
}

export interface CreateMultiAction {
    type: typeof CREATE_MULTI_DYNAMIC_GROUPS,
    payload: ProductGroup[]
}

export interface UpdateAction {
    type: typeof UPDATE_DYNAMIC_GROUP,
    id: number | string,
    payload: ProductGroup
}

export interface DeleteAction {
    type: typeof REMOVE_DYNAMIC_GROUP,
    id: number | string,
}

export type ActionType = ListAction | CreateMultiAction | UpdateAction | DeleteAction;


