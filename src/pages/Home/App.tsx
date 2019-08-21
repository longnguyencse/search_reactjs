import React from 'react';
import {Breadcrumb, Icon, Layout, Menu} from 'antd';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LeftMenu from '../../components/LeftMenu';
import MainContent from '../../components/MainContent';
import Login from "../Login/Login";
import './App.css';
import AddDiscountForm from "../Discount/Add/AddDiscountForm";
import List from "../ProductOrder/list";

interface IAppProps {

}

interface IAppState {
    collapsed: boolean
}

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

class App extends React.Component<IAppProps, IAppState> {

    private listData: any[] = [];

    constructor(props: IAppProps) {
        super(props);
        this.state = ({
            collapsed: false,
        });
        // for (let i = 0; i < 23; i++) {
        //     this.listData.push({
        //         href: 'http://ant.design',
        //         title: `ant design part ${i}`,
        //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //         description:
        //             'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        //         content:
        //             'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //     });
        // }

    }

    onCollapse = (collapsed: any) => {
        console.log(collapsed);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount(): void {
        // axios.get('http://localhost:5200/redmine').then(res => {
        //     console.log(res);
        // });
        // const response = API.Instant().get('/redmine').then(
        //     res => {
        //         console.log(res);
        //     }
        // );
        // console.log(response);
    }


    render() {
        return <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <SubMenu key="sub0" title={
                        <span>
                                <Icon type="pie-chart"/>
                                <span>Đơn Hàng</span>
                            </span>
                    }>
                        <Menu.Item key="1">Nhập ĐH</Menu.Item>
                        <Menu.Item key="2">Duyệt ĐH</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub1" title={
                        <span>
                                <Icon type="user"/>
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
                        <Menu.Item key="5">Tạo NCC</Menu.Item>
                        <Menu.Item key="6">Xem NCC</Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub3" title={
                        <span>
                                <Icon type="pie-chart"/>
                                <span>Sản Phẩm</span>
                            </span>
                    }>
                        <Menu.Item key="7">Nhập SP</Menu.Item>
                        <Menu.Item key="8">Duyệt SP</Menu.Item>
                        <Menu.Item key="9">Xem SP</Menu.Item>
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
            <Layout>
                {/*<Header style={{background: '#fff', padding: 0}}/>*/}
                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Đơn Hàng</Breadcrumb.Item>
                        <Breadcrumb.Item>Duyệt ĐH</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{padding: 24, background: '#fff', minHeight: 1000}}><List/></div>
                </Content>
                <Footer style={{textAlign: 'center'}}>Design ©2019 Created by LNL</Footer>
            </Layout>
        </Layout>;
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/addDiscount" component={AddDiscountForm}/>
                    <Layout>
                        <LeftMenu></LeftMenu>
                        <Layout style={{ marginLeft: 200 }}>
                            <MainContent></MainContent>
                        </Layout>
                    </Layout>
                        <Footer style={{textAlign: 'center'}}>ERP Mini@2019</Footer>

                </Switch>
            </Router>
        );
    }
}


export default App;
