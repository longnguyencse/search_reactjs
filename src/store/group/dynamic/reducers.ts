import {ActionType, ProductGroup} from "./types";
import {LIST_DYNAMIC_GROUP, UPDATE_DYNAMIC_GROUP} from "../../../constants/group";
import {updateArrayObjectByAttribute} from '../../../helpers';

const initialState: {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: ProductGroup[]
} = {
    total: 0,
    totalPage: 0,
    currentPage: 0,
    categories: []
};

export function dynamicGroupReducer(state = initialState, action: ActionType) {
    switch (action.type) {
        case LIST_DYNAMIC_GROUP:
            console.log('action ', action);
            return {
                total: action.total,
                totalPage: action.totalPage,
                currentPage: action.currentPage,
                categories: action.payload,
            };

        case UPDATE_DYNAMIC_GROUP: {
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
