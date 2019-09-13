import {LIST_DYNAMIC_SUPPLIER, UPDATE_DYNAMIC_SUPPLIER} from '../../../constants/supplier';
import {ActionType, Supplier} from './types';
import {updateArrayObjectByAttribute} from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Supplier[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    categories: []
};

export function dynamicSupplierReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_SUPPLIER:
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                categories: action.payload,
            };

        case UPDATE_DYNAMIC_SUPPLIER: {
            console.log(action.payload);
            return {
                ...state,
                categories: updateArrayObjectByAttribute(state.categories, 'id', action.id, action.payload)
            }
        }

        default:
            return state;
    }
}
