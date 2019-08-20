import { AuthState, LOGIN, LOGOUT, CHECK_AUTHENICATE, LoginActionType } from './types';

const initialState: AuthState = {
    userName: "",
    password: "",
    rememeberMe: false,
    token: "",
}

export function authReducer(state = initialState, action: LoginActionType): AuthState {
    switch (action.type) {
        case LOGIN:
            console.log("LOGIN");
            return {
                ...state,
                ...action.payload
            }

        case LOGOUT: {
            console.log("LOGOUT");
            return {
                ...state,
                ...action.payload,
            }
        }
        case CHECK_AUTHENICATE: {
            console.log("CHECK_AUTHENTICATE");
            return {
                ...state,
                ...action.payload,
            }
        }

        default:
            return state;
    }
}