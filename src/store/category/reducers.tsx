import {LIST, CREATE_MULTI, UPDATE, DELETE} from '../constants';
import { Category, CategoryActionType } from './types';

const initialState: {
    staticState: Category[],
    dynamicState: Category[]
} = {
    staticState: [],
    dynamicState: []
};

export function categoryReducer(state = initialState, action: CategoryActionType) {
    switch (action.type) {
        case LIST:
            console.log("LIST", JSON.stringify(action.payload));
            return {
                ...state,
                staticState: action.payload
            }
            break;
        
        case CREATE_MULTI: {
            console.log("CREATE_MULTI");
            return {
                ...state,
                staticState: state.staticState.concat(action.payload)
            }
            break;
        }

        case UPDATE: {
            console.log("UPDATE");
            const staticState = state.staticState;
            const foundIndex = staticState.findIndex((category: any) => category.key === action.key);
            staticState[foundIndex] = action.payload;
            return {
                ...state,
                staticState: staticState
            }
            break;
        }

        case DELETE: {
            console.log("DELETE");
            return {
                ...state,
                staticState: state.staticState.filter((category: any) => {
                    return category.key !== action.key;
                })
            }
            break; 
        }

        default:
            return state;
    }
}