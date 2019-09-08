import {
    LIST_DYNAMIC_CATEGORY,
    CREATE_MULTI_DYNAMIC_CATEGORIES, 
    UPDATE_DYNAMIC_CATEGORY, 
    REMOVE_DYNAMIC_CATEGORY} from '../../../constants/category';
import { Category, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: Category[] = [];

export function staticCategoryReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_CATEGORY:
            return [
                ...state,
                ...action.payload
            ];
        
        case CREATE_MULTI_DYNAMIC_CATEGORIES: {
            return mergeTwoArrayObject(state, action.payload);
        }

        case UPDATE_DYNAMIC_CATEGORY: {
            return updateArrayObjectByAttribute(state, 'id', action.id, action.payload);
        }

        case REMOVE_DYNAMIC_CATEGORY: {
            return filterArrayObjectByAttribute(state, 'id', action.id);
        }

        default:
            return state;
    }
}