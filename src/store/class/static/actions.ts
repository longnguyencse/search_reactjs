import {ActionType, Class} from './types';
import {
    CREATE_MULTI_STATIC_CLASS,
    LIST_STATIC_CLASS,
    REMOVE_STATIC_CLASS,
    UPDATE_STATIC_CLASS
} from "../../../constants/class";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import LocalStorage from "../../../services/LocalStorage";
import {filterArrayObjectByAttribute, mergeTwoArrayObject, updateArrayObjectByAttribute} from "../../../helpers";

// All function use Component call
export const list = (): ThunkAction<void, Class[], null, Action<string>> => async dispatch => {
    const data = await executeList();
    dispatch(
        _list(data)
    );
    console.log('data ', data);
};

export const _list = (data: Class[]): ActionType => {
    return {
        type: LIST_STATIC_CLASS,
        payload: data
    }
};

// All function to execute logic
async function executeList() {
    const localS = new LocalStorage();

    const data = await localS.getArrayValue('classes');

    return data;
}

export const createMulti = (args: Class[]): ThunkAction<void, Class[], null, Action<string>> => async dispatch => {
    const data = await executeCreateMulti(args);
    dispatch(
        _createMulti(data)
    );
};

async function executeCreateMulti(data: Class[]) {
    const localS = new LocalStorage();

    const oldData = await localS.getArrayValue('classes');

    const mergeData = mergeTwoArrayObject(oldData, data);

    await localS.setItem('classes', mergeData);

    return data;
}

export const _createMulti = (groups: Class[]): ActionType => {
    return {
        type: CREATE_MULTI_STATIC_CLASS,
        payload: groups
    }
};

export const update = (key: number | string, data: Class): ThunkAction<void, Class[], null,
    Action<string>> => async dispatch => {
    const result = await executeUpdate(key, data);
    dispatch(
        _update(key, result)
    );
};

async function executeUpdate(key: number | string, data: Class) {
    const localS = new LocalStorage();

    const arr = await localS.getArrayValue('classes');

    const buffer = updateArrayObjectByAttribute(arr, 'key', key, data);

    await localS.setItem('classes', buffer);

    return data;
}

export const _update = (key: number | string, data: Class): ActionType => {
    return {
        type: UPDATE_STATIC_CLASS,
        key: key,
        payload: data,
    }
};

export const remove = (key: number | string): ThunkAction<void, Class[], null,
    Action<string>> => async dispatch => {
    const data = await executeRemove(key);
    dispatch(
        _remove(data)
    );
};

async function executeRemove(key: number | string) {
    const localS = new LocalStorage();

    const buffer = await localS.getArrayValue('classes');

    let data = filterArrayObjectByAttribute(buffer, 'key', key);

    if (!data.length) {
        data = null;
    }

    await localS.setItem('classes', data);

    return key;
}

export const _remove = (groupKey: number | string): ActionType => {
    return {
        type: REMOVE_STATIC_CLASS,
        key: groupKey,
    }
};
