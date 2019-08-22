import React from 'react';

import {Route} from 'react-router-dom';
import Profile from "./profile";
import Logout from "./logout";

interface IProductProps {

}

interface IProductState {

}

class User extends React.Component <IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);
    }

    render() {
        return (
            <div id="user">
                <Route exact path="/user/profile" component={Profile}/>
                <Route exact path="/logout" component={Logout}/>
            </div>
        );
    }
}

export default User;
