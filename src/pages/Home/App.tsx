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
        // return <Layout style={{minHeight: '100vh'}}>
        //     <LeftMenu></LeftMenu>
        //     <Layout>
        //         {/*<Header style={{background: '#fff', padding: 0}}/>*/}
        //         <Content style={{margin: '0 16px'}}>
        //             <Breadcrumb style={{margin: '16px 0'}}>
        //                 <Breadcrumb.Item>Đơn Hàng</Breadcrumb.Item>
        //                 <Breadcrumb.Item>Duyệt ĐH</Breadcrumb.Item>
        //             </Breadcrumb>
        //             <div style={{padding: 24, background: '#fff', minHeight: 600}}><List/></div>
        //         </Content>
        //         <Footer style={{textAlign: 'center'}}>Design ©2019 Created by LNL</Footer>
        //     </Layout>
        // </Layout>;
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/addDiscount" component={AddDiscountForm}/>
                    <Layout style={{minHeight: '100vh'}}>
                        <LeftMenu></LeftMenu>
                        <Layout>
                            <MainContent></MainContent>
                            {/* <Footer style={{textAlign: 'center'}}>Design ©2019 Created by LNL</Footer> */}
                        </Layout>
                    </Layout>

                </Switch>
            </Router>
        );
    }
}


export default App;
