import {ActionType, Class} from "./types";
import {
    CREATE_MULTI_STATIC_CLASS,
    LIST_STATIC_CLASS,
    REMOVE_STATIC_CLASS,
    UPDATE_STATIC_CLASS
} from "../../../constants/class";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

const initialState: Class[] = [];

export function staticClassReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_CLASS:
            return action.payload;
        case CREATE_MULTI_STATIC_CLASS:
            return mergeTwoArrayObject(state, action.payload);
        case UPDATE_STATIC_CLASS:
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        case REMOVE_STATIC_CLASS:
            return filterArrayObjectByAttribute(state, 'key', action.key);
        default:
            return state;
    }

}
