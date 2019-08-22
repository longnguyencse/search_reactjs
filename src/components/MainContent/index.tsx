import React from 'react';

import {Layout, Breadcrumb} from 'antd';

import ProductOrder from '../../pages/ProductOrder';
import Product from '../../pages/Product';

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
            <Content style={{margin: '0 16px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
                {/* <Breadcrumb.Item>Đơn Hàng</Breadcrumb.Item>
                <Breadcrumb.Item>Duyệt ĐH</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{padding: 24, background: '#fff', minHeight: 600}}>
                <ProductOrder />
                <Product />
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
