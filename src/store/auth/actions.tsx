import {Action} from 'redux';
import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT} from './types';
import LocalStorage from '../../services/LocalStorage';
import {ThunkAction} from 'redux-thunk';

export const loginSystem = (newLogin: AuthState): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    const newAuth = await excuteLogin(newLogin);
    dispatch({
        type: LOGIN,
        payload: newAuth,
    });
}

export const logoutSystem = (auth: AuthState): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    const newAuth = await excuteLogout(auth);
    dispatch({
        type: LOGOUT,
        payload: newAuth,
    });
}
// export async function logoutSystem(auth: AuthState){
    // const newAuth = await excuteLogout(auth);
    // return {
    //     type: LOGOUT,
    //     payload: newAuth,
    // }
// }

export const checkAuthenticate = (auth: AuthState): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    const newAuth = await executeCheckAuth(auth);
    dispatch({
        type: CHECK_AUTHENICATE,
        payload: newAuth,
    });
};

async function excuteLogin(newLogin: AuthState){
    const {userName, password} = newLogin;

    const localS = new LocalStorage();
    let token = "";
    if(userName === "nhan" && password === "vo"){
        token = "nhan_vo";
        localS.setValue("token", token);
    }
    else {
        console.error("Error");
    }

    return {
        ...newLogin,
        token
    };
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

async function executeCheckAuth(auth: AuthState){
    const localS = new LocalStorage();

    let token:any = await localS.getValue('token');

    token = token.value;

    console.log(token);

    if(!token){
        token = "";
    }

    return {
        ...auth,
        token
    };
}
