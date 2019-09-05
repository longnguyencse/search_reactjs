import {LIST, CREATE_MULTI, UPDATE, DELETE} from '../../constants';
import { Category, ActionType } from './types';

const initialState: Category[] = [];

export function staticCategoryReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST:
            return [
                ...state,
                ...action.payload
            ];
        
        case CREATE_MULTI: {
            return state.concat(action.payload);
        }

        case UPDATE: {
            const foundIndex = state.findIndex((category: any) => category.key === action.key);
            state[foundIndex] = action.payload;
            return state;
        }

        case DELETE: {
            return state.filter((category: any) => {
                return category.key !== action.key;
            });
        }

        default:
            return state;
    }
}