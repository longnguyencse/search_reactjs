export interface LoginInfoState {
    userName: string,
    password: string,
    rememeberMe?: boolean,
}

export const LOGIN = "LOGIN";

interface LoginAction {
    type: typeof LOGIN,
    payload: LoginInfoState
}

export type LoginActionType = LoginAction;