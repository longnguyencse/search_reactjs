import {
    GET_TOTAL_PAGE_DYNAMIC_PRODUCT,
    LIST_DYNAMIC_PRODUCT,
    CREATE_MULTI_DYNAMIC_PRODUCTS, 
    UPDATE_DYNAMIC_PRODUCT, 
    REMOVE_DYNAMIC_PRODUCT} from '../../../constants/product';
import { Product, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    products: Product[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    products: []
};

export function dynamicProductReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_PRODUCT:
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                products: action.payload,
            };
        
        // case CREATE_MULTI_DYNAMIC_PRODUCTS: {
        //     return {
        //         ...state,
        //         products: mergeTwoArrayObject(state.products, action.payload)
        //     }
        // }

        case UPDATE_DYNAMIC_PRODUCT: {
            console.log(action.payload);
            return {
                ...state,
                products: updateArrayObjectByAttribute(state.products, 'id', action.id, action.payload)
            }
        }

        // case REMOVE_DYNAMIC_PRODUCT: {
        //     return {
        //         ...state,
        //         products: filterArrayObjectByAttribute(state.products, 'id', action.id)
        //     }
        // }

        default:
            return state;
    }
}