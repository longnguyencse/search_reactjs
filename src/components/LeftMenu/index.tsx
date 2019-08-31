import React from "react";
import {Icon, Layout, Menu, Button} from 'antd';

import {Link, Redirect} from 'react-router-dom';

import './styles.scss';

import {AuthState} from '../../store/auth/types';
import {loginSystem, logoutSystem, checkAuthenticate} from '../../store/auth/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

const {Sider} = Layout;
const {SubMenu} = Menu;


interface ILeftMenuState {
    collapsed: boolean
    isRedirect: boolean,
}

interface OwnProps {
}

interface DispatchProps {
    logoutSystem: typeof logoutSystem,
    checkAuthenticate: typeof checkAuthenticate,
}

interface StateProps {
    auth: AuthState
}

type Props = OwnProps & DispatchProps & StateProps;

class LeftMenu extends React.Component<Props, ILeftMenuState> {
    constructor(props: Props){
        super(props);

        this.state = ({
            collapsed: false,
            isRedirect: false,
        });
    }

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleLogout = () => {
        this.props.logoutSystem();
        this.handleCheckAuthenticate();
        console.log(this.props.auth);
        // if(!this.props.auth.token){
        //     this.setState({
        //         isRedirect: true,
        //     });
        // }
        
        // this.props.checkAuthenticate(this.props.auth);
        // this.props.logoutSystem({});
        // console.log(this.props);
    }

    async handleCheckAuthenticate(){
        await this.props.checkAuthenticate(this.props.auth);
        const {auth} = this.props;
        if(!auth.token){
            this.setState({
                isRedirect: true,
            })
        }
    }

    render(){
        if(this.state.isRedirect){
            return <Redirect to="/login" />
        }
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="sub0" title={
                        <span>
                                <Icon type="pie-chart"/>
                                <span>Đơn Hàng</span>
                            </span>
                    }>
                        <Menu.Item key="1">
                            <Link to="/create/po">Nhập ĐH</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/po">Duyệt ĐH</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub1" title={
                        <span>
                                <Icon type="dollar"/>
                                <span>Chiết khấu</span>
                         </span>
                    }>
                        <Menu.Item key="3">
                            <Link to="/create/discount">Nhập CK</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to="/discounts">Xem CK</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" title={
                        <span>
                                <Icon type="team"/>
                                <span>Nhà Cung Cấp</span>
                            </span>
                    }>
                        <Menu.Item key="5">
                            <Link to={"/supplier/create"}>Tạo NCC</Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to={"/suppliers"}>Xem NCC</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" title={
                        <span>
                                <Icon type="gift"/>
                                <span>Tồn kho</span>
                            </span>
                    }>
                        <Menu.Item key="7">
                            <Link to="/products">Sản phẩm</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/categories">Category (ML1)</Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/groups">Group (ML2)</Link>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <Link to="/classes">Class (ML3)</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub4" title={
                        <span>
                                <Icon type="user"/>
                                <span>Người Dùng</span>
                            </span>
                    }>
                        <Menu.Item key="11">
                            <Link to="/user/profile">Thông Tin</Link></Menu.Item>
                        <Menu.Item key="12">
                            <Link to="/logout">Thoát</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="13">
                        <Button type="danger" onClick={this.handleLogout}>Logout</Button>
                    </Menu.Item>
                </Menu>
                

            </Sider>
        );
        return (
            <Sider className="left-sider">
                <Menu>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="appstore-o" />
                            <span className="nav-text">
                                <Link to="/po">Product Order</Link>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="user" />
                            <span className="nav-text">Test</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub4"
                            title={
                                <span>
                <Icon type="setting"/>
                <span>Navigation Three</span>
              </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = (states: AppState, ownProps: OwnProps) => ({
    auth: states.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    logoutSystem: () => dispatch(logoutSystem()),
    checkAuthenticate: (auth) => dispatch(checkAuthenticate(auth))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftMenu);

