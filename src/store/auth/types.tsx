export interface AuthState {
    userName?: string,
    password?: string,
    rememeberMe?: boolean,
    token?: string,
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECK_AUTHENICATE = "CHECK_AUTHENICATE";

interface LoginAction {
    type: typeof LOGIN,
    payload: AuthState
}

interface LogoutAction {
    type: typeof LOGOUT,
    payload: AuthState,
}

interface CheckAuthenticateAction {
    type: typeof CHECK_AUTHENICATE,
    payload: AuthState,
}

export type LoginActionType = LoginAction | LogoutAction | CheckAuthenticateAction;