import {LoginInfoState, LOGIN} from './types';

export function loginSystem(newLogin: LoginInfoState){
    console.log(newLogin);
    return {
        type: LOGIN,
        payload: newLogin,
    }
}