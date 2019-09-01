import {LIST, CREATE_MULTI} from '../constants';
import { Category, CategoryActionType } from './types';

const initialState :{
    listCategory: Category[],
    createMultiCategory: Category[]
} = {
    listCategory: [],
    createMultiCategory: []
};
export function categoryReducer(state = initialState, action: CategoryActionType) {
    switch (action.type) {
        case LIST:
            console.log("LIST", JSON.stringify(action.payload));
            return {
                ...state,
                listCategory: action.payload
            }
            break;
        
        case CREATE_MULTI: {
            console.log("CREATE_MULTI");
            return {
                ...state,
                createMultiCategory: state.createMultiCategory.concat(action.payload)
            }
            break;
        }

        default:
            return state;
    }
}