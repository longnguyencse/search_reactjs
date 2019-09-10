import {
    LIST_STATIC_PRODUCT, 
    CREATE_MULTI_STATIC_PRODUCTS, 
    UPDATE_STATIC_PRODUCT, 
    REMOVE_STATIC_PRODUCT} from '../../../constants/product';
import { Product, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: Product[] = [];

export function staticProductReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_PRODUCT:
            return action.payload;
        
        case CREATE_MULTI_STATIC_PRODUCTS: {
            return mergeTwoArrayObject(state, action.payload);
        }

        case UPDATE_STATIC_PRODUCT: {
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        }

        case REMOVE_STATIC_PRODUCT: {
            return filterArrayObjectByAttribute(state, 'key', action.key);
        }

        default:
            return state;
    }
}