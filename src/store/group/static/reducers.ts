import {ActionType, ProductGroup} from "./types";
import {
    CREATE_MULTI_STATIC_GROUP,
    LIST_STATIC_GROUP,
    REMOVE_STATIC_GROUP,
    UPDATE_STATIC_GROUP
} from "../../../constants/group";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

const initialState: ProductGroup[] = [];

export function staticGroupReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_GROUP:
            return action.payload;
        case CREATE_MULTI_STATIC_GROUP:
            return mergeTwoArrayObject(state, action.payload);
        case UPDATE_STATIC_GROUP:
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        case REMOVE_STATIC_GROUP:
            return filterArrayObjectByAttribute(state, 'key', action.key);
        default:
            return state;
    }

}
