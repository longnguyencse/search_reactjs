export interface AuthState {
    userName?: string,
    password?: string,
    rememeberMe?: boolean,
    token?: string,
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

interface LoginAction {
    type: typeof LOGIN,
    payload: AuthState
}

interface LogoutAction {
    type: typeof LOGOUT,
    payload: AuthState,
}

export type LoginActionType = LoginAction | LogoutAction;