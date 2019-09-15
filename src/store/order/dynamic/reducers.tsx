import {
    GET_PRODUCTS_BELONG_SUPPLIER, UPDATE_DYNAMIC_ORDER, LIST_DYNAMIC_ORDER
} from '../../../constants/order';
import { ActionType, Order } from './types';
import { updateArrayObjectByAttribute } from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    orders: Order[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    orders: []
};

export function dynamicOrderReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_ORDER:
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                orders: action.payload,
            };
        

        // case UPDATE_DYNAMIC_ORDER: {
        //     console.log(action.payload);
        //     return {
        //         ...state,
        //         products: updateArrayObjectByAttribute(state.products, 'id', action.id, action.payload)
        //     }
        // }

        default:
            return state;
    }
}

export function supplierProductReducer(state = [], action: ActionType){
    switch (action.type) {
        case GET_PRODUCTS_BELONG_SUPPLIER:
            return action.payload;
        default:
            return state;
    }
}