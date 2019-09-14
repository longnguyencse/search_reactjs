import {ActionType, Supplier} from './types';
import {
    CREATE_MULTI_STATIC_SUPPLIER,
    LIST_STATIC_SUPPLIER,
    REMOVE_STATIC_SUPPLIER,
    UPDATE_STATIC_SUPPLIER
} from "../../../constants/supplier";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import LocalStorage from "../../../services/LocalStorage";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

const mapKey = 'suppliers';

// All function use Component call
export const list = (): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
    const data = await executeList();
    dispatch(
        _list(data)
    );
    console.log('data ', data);
};

export const _list = (data: Supplier[]): ActionType => {
    return {
        type: LIST_STATIC_SUPPLIER,
        payload: data
    }
};

// All function to execute logic
async function executeList() {
    const localS = new LocalStorage();

    const data = await localS.getArrayValue(mapKey);

    return data;
}

export const createMulti = (args: Supplier[]): ThunkAction<void, Supplier[], null, Action<string>> => async dispatch => {
    const data = await executeCreateMulti(args);
    dispatch(
        _createMulti(data)
    );
};

async function executeCreateMulti(data: Supplier[]) {
    const localS = new LocalStorage();

    const oldData = await localS.getArrayValue(mapKey);

    const mergeData = mergeTwoArrayObject(oldData, data);

    await localS.setItem(mapKey, mergeData);
    console.log('data ', data);
    return data;
}

export const _createMulti = (groups: Supplier[]): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_SUPPLIER,
        payload: groups
    }
};

export const update = (key: number | string, data: Supplier): ThunkAction<void, Supplier[], null,
    Action<string>> => async dispatch => {
    const result = await executeUpdate(key, data);
    dispatch(
        _update(key, result)
    );
};

async function executeUpdate(key: number | string, data: Supplier) {
    const localS = new LocalStorage();

    const arr = await localS.getArrayValue(mapKey);

    const buffer = updateArrayObjectByAttribute(arr, 'key', key, data);

    await localS.setItem(mapKey, buffer);

    return data;
}

export const _update = (key: number | string, data: Supplier): ActionType => {
    return {
        type: UPDATE_STATIC_SUPPLIER,
        key: key,
        payload: data,
    }
};

export const remove = (key: number | string): ThunkAction<void, Supplier[], null,
    Action<string>> => async dispatch => {
    const data = await executeRemove(key);
    dispatch(
        _remove(data)
    );
};

async function executeRemove(key: number | string) {
    const localS = new LocalStorage();

    const buffer = await localS.getArrayValue(mapKey);

    let data = filterArrayObjectByAttribute(buffer, mapKey, key);

    if (!data.length) {
        data = null;
    }

    await localS.setItem(mapKey, data);

    return key;
}

export const _remove = (groupKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_SUPPLIER,
        key: groupKey,
    }
};
