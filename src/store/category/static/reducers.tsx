import {LIST_STATIC_CATEGORY, CREATE_MULTI_STATIC_CATEGORIES, UPDATE_STATIC_CATEGORY, REMOVE_STATIC_CATEGORY} from '../../constants';
import { Category, ActionType } from './types';

const initialState: Category[] = [];

export function staticCategoryReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_STATIC_CATEGORY:
            return [
                ...state,
                ...action.payload
            ];
        
        case CREATE_MULTI_STATIC_CATEGORIES: {
            return state.concat(action.payload);
        }

        case UPDATE_STATIC_CATEGORY: {
            const foundIndex = state.findIndex((category: any) => category.key === action.key);
            state[foundIndex] = action.payload;
            return state;
        }

        case REMOVE_STATIC_CATEGORY: {
            return state.filter((category: any) => {
                return category.key !== action.key;
            });
        }

        default:
            return state;
    }
}