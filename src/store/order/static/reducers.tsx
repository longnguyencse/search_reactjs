import {
    LIST_STATIC_ORDER, 
    CREATE_MULTI_STATIC_ORDERS, 
    UPDATE_STATIC_ORDER, 
    REMOVE_STATIC_ORDER} from '../../../constants/order';
import { Order, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: Order[] = [];

export function staticOrderReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_ORDER:
            return action.payload;
        
        case CREATE_MULTI_STATIC_ORDERS: {
            return mergeTwoArrayObject(state, action.payload);
        }

        case UPDATE_STATIC_ORDER: {
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        }

        case REMOVE_STATIC_ORDER: {
            return filterArrayObjectByAttribute(state, 'key', action.key);
        }

        default:
            return state;
    }
}