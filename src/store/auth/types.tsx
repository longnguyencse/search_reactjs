export interface AuthState {
    userName?: string,
    password?: string,
    rememeberMe?: boolean,
    token?: string,
}

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECK_AUTHENICATE = "CHECK_AUTHENICATE";

// export const SET = "SET";
// export const IS_FETCHING = "IS_FETCHING";

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


// interface SetAction {
//     type: typeof SET,
//     payload: AuthState
// }

// interface SetFetching {
//     type: typeof IS
// }

export type LoginActionType = LoginAction | LogoutAction | CheckAuthenticateAction;