import {LIST_STATIC_CATEGORY, CREATE_MULTI_STATIC_CATEGORIES, UPDATE_STATIC_CATEGORY, REMOVE_STATIC_CATEGORY} from '../../constants';
import { Category, ActionType } from './types';
import { mergeTwoArrayObject, updateArrayObjectByAttribute, filterArrayObjectByAttribute } from '../../../helpers';

const initialState: Category[] = [];

export function staticCategoryReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_CATEGORY:
            return action.payload;
        
        case CREATE_MULTI_STATIC_CATEGORIES: {
            return mergeTwoArrayObject(state, action.payload);
        }

        case UPDATE_STATIC_CATEGORY: {
            return updateArrayObjectByAttribute(state, 'key', action.key, action.payload);
        }

        case REMOVE_STATIC_CATEGORY: {
            return filterArrayObjectByAttribute(state, 'key', action.key);
        }

        default:
            return state;
    }
}