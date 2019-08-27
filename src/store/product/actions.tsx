import {Action, AnyAction} from 'redux';
// import {AuthState, CHECK_AUTHENICATE, LOGIN, LOGOUT, AuthenActionType} from './types';
import {LIST, GET, CREATE_MULTI, UPDATE, DELETE} from '../constants';
import { Product, ProductActionType } from './types';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

import API from '../../services/API';

import axios from 'axios';

export const _listProduct = (products: Product[]): ProductActionType => {
    return {
        type: LIST,
        payload: products
    }
}

export const _getProduct = (product: Product): ProductActionType => {
    return {
        type: GET,
        payload: product
    }
}

export const _createMultiProduct = (products: Product[]): ProductActionType => {
    console.log("_createMultiProduct");
    return {
        type: CREATE_MULTI,
        payload: products
    }
}

export const _updateProduct = (product: Product): ProductActionType => {
    return {
        type: UPDATE,
        payload: product
    }
}

export const _deleteProduct = (product: Product): ProductActionType => {
    return {
        type: DELETE,
        payload: product
    }
}

export const createMultiProduct = (products: {
    code: string,
    name: string
}[]): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    console.log("createMultiProduct");
    const newProducts = await executeCreateMultiProduct(products);
    dispatch(
        _createMultiProduct(newProducts)
    );
}

export const listProduct = (): ThunkAction<void, Product[], null, Action<string>> => async dispatch => {
    const newProducts = await executeListProduct();
    dispatch(
        _listProduct(newProducts)
    );
}

async function executeCreateMultiProduct(products: {
    code: string,
    name: string
}[]){
    console.log("executeCreateMultiProduct");
    const newProducts = products.map((value, index) => {
        return {
            ...value,
            id: index + 2
        }
    })
    console.log("executeCreateMultiProduct-getValue", newProducts)
    return newProducts;
}

async function executeListProduct(){
    let products = [];
    const i = 0;
    // for (let i = 0; i < 5; i++) {
        products.push({
            key: i,
            id: i,
            productName: `tenSanPham-${i}`,
            productCode:  `maSanPham-${i}`,
            status: "Huy"
        })
    // }
    return products;
}

// export const _loginSystem = (auth: AuthState): AuthenActionType => {
//     console.log("_loginSystem");
//     return {
//         type: LOGIN,
//         payload: auth
//     }
// }

// export const _logoutSystem = (auth: AuthState): AuthenActionType => {
//     console.log("_logoutSystem");
//     return {
//         type: LOGOUT,
//         payload: auth
//     }   
// }

// export const _checkAuthenticate = (auth: AuthState): AuthenActionType => {
//     console.log("_checkAuthenticate");
//     return {
//         type: CHECK_AUTHENICATE,
//         payload: auth
//     };
// }

// export const loginSystem = (userName: string, password: string): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
//     console.log("loginSystem");
//     const newAuth = await excuteLogin(userName, password);
//     dispatch(
//         _loginSystem(newAuth)
//     );
// }

// export const logoutSystem = (): ThunkAction<void, AuthState, null, Action<string>> => async dispatch => {
//     console.log("logoutSystem");
//     const newAuth = await excuteLogout();
//     dispatch(
//         _logoutSystem(newAuth)
//     )
// }

// export const checkAuthenticate = (auth: AuthState): ThunkAction<void, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     console.log("checkAuthenticate");
//     const newAuth = await executeCheckAuth(auth);
//     dispatch(
//         _checkAuthenticate(newAuth)
//     );
// };

// async function excuteLogin(userName: string, password: string){

//     const postData = {
//         userName,
//         password
//     };

//     // axios
//     //     .post(API.apiLogin, postData)
//     //     .then(response => {
//     //         const localS = new LocalStorage();
//     //         const data = response.data;
//     //         let token = "";
//     //         if(data){
//     //             token = data.data.accessToken;
//     //         }
//     //         localS.setValue("token", token).then(() => {
//     //             localS.getValue("token").then(data => {
//     //                 console.log(data);
//     //             }).catch(err => {console.log(err)});
//     //         }).catch(err => {
//     //             console.log(err);
//     //         })
            
//     //     })
//     //     .catch(err => {
//     //         console.log(err);
//     //         return null;
//     //     });

//     // return {
//     //     userName,
//     //     password,
//     // };

//     let token = "";

//     try{
//         const response = await axios.post(API.apiLogin, postData);
//         if(response){
//             const localS = new LocalStorage();
//             token = response.data.data.accessToken;
//             await localS.setValue("token", token);
//         }
//     }
//     catch(ex){
//         console.error(ex);
//     }

//     return {
//         userName,
//         password,
//         token
//     };
// }

// async function excuteLogout(){
//     const localS = new LocalStorage();
//     // let tokenObject = await localS.getValue('token');

//     // let token = "";
//     // if(tokenObject) {
        
//     // }

//     let token = "";
//     await localS.setValue("token", token);
//     console.log("++++++++++token", token);

//     return {
//         token
//     };
// }

// async function executeCheckAuth(auth: AuthState){
//     const localS = new LocalStorage();

//     let tokenObject:any = await localS.getValue('token');

//     let token = "";

//     if(tokenObject){
//         token = tokenObject.value;
//     }
    

//     return {
//         ...auth,
//         token
//     };
// }
