import React from "react";
import {Icon, Layout, Menu} from 'antd';

import {Link} from 'react-router-dom';

import './styles.scss';

const {Sider} = Layout;
const {SubMenu} = Menu;

export default class LeftMenu extends React.Component<ILeftMenuProps, ILeftMenuState> {
    constructor(props: ILeftMenuProps){
        super(props);

        this.state = ({
            collapsed: false,
        });
    }

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render(){
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
                        <Menu.Item key="3">Nhập CK</Menu.Item>
                        <Menu.Item key="4">Xem CK</Menu.Item>
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
                        <Menu.Item key="6">Xem NCC</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" title={
                        <span>
                                <Icon type="gift"/>
                                <span>Sản Phẩm</span>
                            </span>
                    }>
                        <Menu.Item key="7">
                            <Link to="/product/create">Nhập SP</Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/product">Duyệt SP</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="9">Xem SP</Menu.Item> */}
                    </SubMenu>

                    <SubMenu key="sub4" title={
                        <span>
                                <Icon type="user"/>
                                <span>Người Dùng</span>
                            </span>
                    }>
                        <Menu.Item key="10">Thông Tin</Menu.Item>
                        <Menu.Item key="11">Thoát</Menu.Item>
                    </SubMenu>
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
};

interface ILeftMenuProps {

}

interface ILeftMenuState {
    collapsed: boolean
}
