import {
    GET_PRODUCTS_BELONG_SUPPLIER
} from '../../../constants/order';
import { ActionType } from './types';

export function supplierProductReducer(state = [], action: ActionType){
    switch (action.type) {
        case GET_PRODUCTS_BELONG_SUPPLIER:
            return action.payload;
        default:
            return state;
    }
}