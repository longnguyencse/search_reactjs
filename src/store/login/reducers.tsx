import { LoginInfoState ,LOGIN, LoginActionType} from './types';

const initialState: LoginInfoState = {
    userName: "",
    password: "",
    rememeberMe: false,
}

export function loginReducer(state = initialState, action: LoginActionType) : LoginInfoState{
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload
            }
            break;
    
        default:
            return state;
            break;
    }
}