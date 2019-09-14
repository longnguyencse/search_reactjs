import {ActionType, ProductGroup} from "./types";
import {
    CREATE_MULTI_STATIC_GROUP,
    LIST_STATIC_GROUP,
    REMOVE_STATIC_GROUP,
    UPDATE_STATIC_GROUP
} from "../../../constants/group";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import LocalStorage from "../../../services/LocalStorage";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

// All function use Component call
export const list = (): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const data = await executeList();
    dispatch(
        _list(data)
    );
    console.log('data ', data);
};

export const _list = (productGroups: ProductGroup[]): ActionType => {
    return {
        type: LIST_STATIC_GROUP,
        payload: productGroups
    }
};

// All function to execute logic
async function executeList() {
    const localS = new LocalStorage();

    const groups = await localS.getArrayValue('groups');

    return groups;
}

export const createMulti = (groups: ProductGroup[]): ThunkAction<void, ProductGroup[], null, Action<string>> => async dispatch => {
    const data = await executeCreateMulti(groups);
    dispatch(
        _createMulti(data)
    );
};

async function executeCreateMulti(data: ProductGroup[]) {
    const localS = new LocalStorage();

    const oldData = await localS.getArrayValue('groups');

    const mergeData = mergeTwoArrayObject(oldData, data);

    await localS.setItem('groups', mergeData);

    return data;
}

export const _createMulti = (groups: ProductGroup[]): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_GROUP,
        payload: groups
    }
};

export const update = (groupKey: number | string, data: ProductGroup): ThunkAction<void, ProductGroup[], null,
    Action<string>> => async dispatch => {
    const result = await executeUpdate(groupKey, data);
    dispatch(
        _update(groupKey, result)
    );
};

async function executeUpdate(key: number | string, data: ProductGroup) {
    const localS = new LocalStorage();

    const categories = await localS.getArrayValue('groups');

    const buffer = updateArrayObjectByAttribute(categories, "key", key, data);

    await localS.setItem('groups', buffer);

    return data;
}

export const _update = (groupKey: number | string, group: ProductGroup): ActionType => {
    return {
        type: UPDATE_STATIC_GROUP,
        key: groupKey,
        payload: group,
    }
};

export const remove = (key: number | string): ThunkAction<void, ProductGroup[], null,
    Action<string>> => async dispatch => {
    const data = await executeRemove(key);
    dispatch(
        _remove(data)
    );
};

async function executeRemove(key: number | string) {
    const localS = new LocalStorage();

    const buffer = await localS.getArrayValue('groups');

    let data = filterArrayObjectByAttribute(buffer, "key", key);

    if (!data.length) {
        data = null;
    }

    await localS.setItem('groups', data);

    return key;
}

export const _remove = (groupKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_GROUP,
        key: groupKey,
    }
};
