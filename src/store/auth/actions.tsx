import {Action, AnyAction} from 'redux';
import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT, AuthenActionType} from './types';
import LocalStorage from '../../services/LocalStorage';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import API from '../../services/API';

import { Observable } from 'rxjs';
import axios from 'axios';

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

    const postData = {
        userName,
        password
    };

    // axios
    //     .post(API.apiLogin, postData)
    //     .then(response => {
    //         const localS = new LocalStorage();
    //         const data = response.data;
    //         let token = "";
    //         if(data){
    //             token = data.data.accessToken;
    //         }
    //         localS.setValue("token", token).then(() => {
    //             localS.getValue("token").then(data => {
    //                 console.log(data);
    //             }).catch(err => {console.log(err)});
    //         }).catch(err => {
    //             console.log(err);
    //         })
            
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         return null;
    //     });

    // return {
    //     userName,
    //     password,
    // };

    let token = "";

    try{
        const response = await axios.post(API.apiLogin, postData);
        if(response){
            const localS = new LocalStorage();
            token = response.data.data.accessToken;
            await localS.setValue("token", token);
        }
    }
    catch(ex){
        console.error(ex);
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
