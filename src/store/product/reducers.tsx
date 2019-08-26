import {CREATE_MULTI} from '../constants';
import { Product, ProductActionType } from './types';

const initialState: Product[] = [
];
export function productReducer(state = initialState, action: ProductActionType): Product[] {
    switch (action.type) {
        case CREATE_MULTI:
            console.log("CREATE_MULTI");
            return {
                ...state,
                ...action.payload
            }

        // case LOGOUT: {
        //     console.log("LOGOUT");
        //     return {
        //         ...state,
        //         ...action.payload,
        //     }
        // }
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