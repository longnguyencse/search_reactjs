import {Action, AnyAction} from 'redux';
import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT, AuthenActionType} from './types';
import LocalStorage from '../../services/LocalStorage';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

export const _loginSystem = (auth: AuthState): AuthenActionType => {
    console.log("_loginSystem");
    return {
        type: LOGIN,
        payload: auth
    }
}

export const _logoutSystem = (auth: AuthState): AuthenActionType => {
    console.log("_logoutSystem");
    return {
        type: LOGOUT,
        payload: auth
    }   
}

export const _checkAuthenticate = (auth: AuthState): AuthenActionType => {
    console.log("_checkAuthenticate");
    return {
        type: CHECK_AUTHENICATE,
        payload: auth
    };
}

export const loginSystem = (userName: string, password: string): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    console.log("loginSystem");
    const newAuth = await excuteLogin(userName, password);
    dispatch(
        _loginSystem(newAuth)
    );
}

export const logoutSystem = (): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
    console.log("logoutSystem");
    const newAuth = await excuteLogout();
    dispatch(
        _logoutSystem(newAuth)
    )
}

export const checkAuthenticate = (auth: AuthState): ThunkAction<void, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    console.log("checkAuthenticate");
    const newAuth = await executeCheckAuth(auth);
    dispatch(
        _checkAuthenticate(newAuth)
    );
};

async function excuteLogin(userName: string, password: string){
    const localS = new LocalStorage();
    let token = "";
    if(userName === "nhan" && password === "vo"){
        token = "nhan_vo";
        await localS.setValue("token", token);
    }
    else {
        console.error("Error");
    }

    return {
        userName,
        password,
        token
    };
}

async function excuteLogout(){
    const localS = new LocalStorage();
    // let tokenObject = await localS.getValue('token');

    // let token = "";
    // if(tokenObject) {
        
    // }

    let token = "";
    await localS.setValue("token", token);
    console.log("++++++++++token", token);

    return {
        token
    };
}

async function executeCheckAuth(auth: AuthState){
    const localS = new LocalStorage();

    let tokenObject:any = await localS.getValue('token');

    let token = "";

    if(tokenObject){
        token = tokenObject.value;
    }
    

    return {
        ...auth,
        token
    };
}
