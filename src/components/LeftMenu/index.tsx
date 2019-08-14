import React from "react";
import {Layout, Menu, Icon} from 'antd';

import {Link} from 'react-router-dom';

import './styles.scss';
const {Sider} = Layout;

export default class LeftMenu extends React.Component<ILeftMenuProps, ILeftMenuState> {
    constructor(props: ILeftMenuProps){
        super(props);
    }

    render(){
        return (
            <Sider className="left-sider">
                <Menu>
                    {/* <div className="logo">
                        <img src="https://images.unsplash.com/photo-1533407411655-dcce1534c1a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80" alt="" width="100px"/>
                    </div> */}
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
