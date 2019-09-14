import {LIST, CREATE_MULTI} from '../constants';
import { Product, ProductActionType } from './types';

const initialState :{
    listProduct: Product[],
    createMultiProduct: Product[]
} = {
    listProduct: [],
    createMultiProduct: []
};
export function productReducer(state = initialState, action: ProductActionType) {
    switch (action.type) {
        case LIST:
            console.log("LIST", JSON.stringify(action.payload));
            return {
                ...state,
                listProduct: action.payload
            }
            break;
        
        case CREATE_MULTI: {
            console.log("CREATE_MULTI");
            return {
                ...state,
                createMultiProduct: state.createMultiProduct.concat(action.payload)
            }
            break;
        }

        // case CHECK_AUTHENICATE: {
        //     console.log("CHECK_AUTHENTICATE");
        //     return {
        //         ...state,
        //         ...action.payload,
        //     }
        // }

        default:
            return state;
    }
}