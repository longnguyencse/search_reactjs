import {
    GET_TOTAL_PAGE_DYNAMIC_CATEGORY,
    LIST_DYNAMIC_CATEGORY,
    CREATE_MULTI_DYNAMIC_CATEGORIES, 
    UPDATE_DYNAMIC_CATEGORY, 
    REMOVE_DYNAMIC_CATEGORY} from '../../../constants/category';
import { Category, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Category[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    categories: []
};

export function dynamicCategoryReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_CATEGORY:
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                categories: action.payload,
            };
        
        // case CREATE_MULTI_DYNAMIC_CATEGORIES: {
        //     return {
        //         ...state,
        //         categories: mergeTwoArrayObject(state.categories, action.payload)
        //     }
        // }

        case UPDATE_DYNAMIC_CATEGORY: {
            console.log(action.payload);
            return {
                ...state,
                categories: updateArrayObjectByAttribute(state.categories, 'id', action.id, action.payload)
            }
        }

        // case REMOVE_DYNAMIC_CATEGORY: {
        //     return {
        //         ...state,
        //         categories: filterArrayObjectByAttribute(state.categories, 'id', action.id)
        //     }
        // }

        default:
            return state;
    }
}