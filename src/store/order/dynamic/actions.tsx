import {Action, AnyAction} from 'redux';
import {
    GET_PRODUCTS_BELONG_SUPPLIER,
} from '../../../constants/order';

import { ActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import LocalStorage from '../../../services/LocalStorage';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

import API from '../../../services/API';
import axios from 'axios';


// All function use to dispatch
export const _getProductsBelongSupplier = (products: any): ActionType => {
    return {
        type: GET_PRODUCTS_BELONG_SUPPLIER,
        payload: products
    };
}
// All function use to dispatch

// All function use Component call
export const getProductsBelongSupplier = (supplierId: number | string): ThunkAction<void, [], null, Action<string>> => async dispatch => {
    const newProducts = await exeGetProductsBelongSupplier(supplierId);
    const newValue = {
        supplierId,
        products: newProducts
    };
    dispatch(
        _getProductsBelongSupplier(newValue)
    );
}
// All function use Component call

// All function to execute logic
export async function exeGetProductsBelongSupplier(supplierId: number | string){
    try{
        const url = API.apiSupplierProduct + '/products';

        const params = {
            supplier_is: supplierId
        };

        const response: any = await axios.get(url, {
            params
        });

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}

export async function exeGetSuppierProductDetail(supplierId: number | string, productId: number | string){
    try{
        const url = API.apiSupplierProductDetail;

        const params = {
            supplier_id: supplierId,
            product_id: productId
        };

        const response: any = await axios.get(url, {
            params
        });

        const responseData: any = response.data.data;

        return responseData;
    }
    catch(ex){
        console.log(ex);
    }
}
// All function to execute logic