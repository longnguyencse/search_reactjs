import {LIST_DYNAMIC_CLASS, UPDATE_DYNAMIC_CLASS} from '../../../constants/class';
import {ActionType, Class} from './types';
import {updateArrayObjectByAttribute} from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Class[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    categories: []
};

export function dynamicClassReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_CLASS:
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                categories: action.payload,
            };

        case UPDATE_DYNAMIC_CLASS: {
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
