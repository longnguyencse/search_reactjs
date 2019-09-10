import {ActionType, Supplier} from "./types";
import {
    CREATE_MULTI_STATIC_SUPPLIER,
    LIST_STATIC_SUPPLIER,
    REMOVE_STATIC_SUPPLIER,
    UPDATE_STATIC_SUPPLIER
} from "../../../constants/supplier";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

const initialState: Supplier[] = [];

export function staticSupplierReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_SUPPLIER:
            return action.payload;
        case CREATE_MULTI_STATIC_SUPPLIER:
            return mergeTwoArrayObject(state, action.payload);
        case UPDATE_STATIC_SUPPLIER:
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        case REMOVE_STATIC_SUPPLIER:
            return filterArrayObjectByAttribute(state, 'key', action.key);
        default:
            return state;
    }

}
