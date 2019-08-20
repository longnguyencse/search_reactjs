import React from 'react';

import {Layout} from 'antd';

import ProductOrder from '../../pages/ProductOrder';

import "./styles.scss";
import {checkAuthenticate} from '../../store/auth/actions';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import {Dispatch} from "redux";

const {Content} = Layout;


interface IMainContentProps {
    checkAuthenticate: typeof checkAuthenticate,
}

interface IMainContentState {

}

class MainContent extends React.Component<IMainContentProps, IMainContentState> {
    constructor(props: IMainContentProps){
        super(props);

        // props.checkAuthenticate(props.auth);
    }

    render(){
        return (
            <Content className="main-content">
                        <div className="div-main-content">
                            <ProductOrder></ProductOrder>
                </div>
                    </Content>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: Dispatch): IMainContentProps => ({
        checkAuthenticate: checkAuthenticate
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainContent);
