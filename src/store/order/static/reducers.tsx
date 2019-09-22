import {
    LIST_STATIC_ORDER, 
    CREATE_MULTI_STATIC_ORDERS, 
    UPDATE_STATIC_ORDER, 
    REMOVE_PRODUCT_IN_STATIC_ORDER
} from '../../../constants/order';
import { Order, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState = {
    supplierId: 0,
    items: []
};

export function staticOrderReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_ORDER:
            return action.payload;
        
        case CREATE_MULTI_STATIC_ORDERS: {
            console.log("state", state);
            console.log('action' ,action);
            return {
                ...state,
                supplierId: action.payload.supplierId,
                items: mergeTwoArrayObject(state.items, action.payload.items)
            };
        }

        case UPDATE_STATIC_ORDER: {
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        }

        case REMOVE_PRODUCT_IN_STATIC_ORDER: {
            const filterItems = filterArrayObjectByAttribute(state.items, 'productId', action.key);
            if(!filterItems.length){
                return initialState;
            }
            return {
                ...state,
                items: filterItems
            };
            // return filterArrayObjectByAttribute(state, 'key', action.key);
        }

        default:
            return state;
    }
}