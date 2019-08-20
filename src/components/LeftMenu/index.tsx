import React from "react";
import {Icon, Layout, Menu} from 'antd';

import {Link} from 'react-router-dom';

import './styles.scss';

const {Sider} = Layout;
const {SubMenu} = Menu;

export default class LeftMenu extends React.Component<ILeftMenuProps, ILeftMenuState> {
    constructor(props: ILeftMenuProps){
        super(props);
    }

    render(){
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

}
