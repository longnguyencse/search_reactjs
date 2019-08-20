import {Action} from 'redux';
import {AuthState, LOGIN, LOGOUT} from './types';
import LocalStorage from '../../services/LocalStorage';
import {ThunkAction} from 'redux-thunk';

export function loginSystem(newLogin: AuthState){
    excuteLogin(newLogin);
    return {
        type: LOGIN,
        payload: newLogin,
    }
}

export const logoutSystem = (auth: AuthState): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    const newAuth = await excuteLogout(auth);
    dispatch({
        type: LOGOUT,
        payload: newAuth,
    });
};
// export async function logoutSystem(auth: AuthState){
    // const newAuth = await excuteLogout(auth);
    // return {
    //     type: LOGOUT,
    //     payload: newAuth,
    // }
// }

async function excuteLogin(newLogin: AuthState){
    const {userName, password} = newLogin;

    const localS = new LocalStorage();
    if(userName === "nhan" && password === "vo"){
        const token = "nhan_vo";
        localS.setValue("token", token);
    }
    else {
        console.error("Error");
    }
}

async function excuteLogout(auth: AuthState){
    const localS = new LocalStorage();
    let token = await localS.getValue('token');

    let res;
    if(token){
        token = "remove";
        res = {
            ...auth,
            token
        }
    }
    else {
        res = auth;
    }

    return res;
}
