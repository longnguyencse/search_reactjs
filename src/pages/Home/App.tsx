import React from 'react';
import {Layout, Menu} from 'antd';
import {Router, Route, Switch} from 'react-router-dom';
import LeftMenu from '../../components/LeftMenu';
import MainContent from '../../components/MainContent';
import Login from "../Login/Login";
import './App.css';


import {AuthState} from '../../store/auth/types';
import {checkAuthenticate} from '../../store/auth/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';
import history from '../../history';


interface OwnProps {

}

interface StateProps {
    auth: AuthState,
}

interface DispatchProps {
    checkAuthenticate: typeof checkAuthenticate,
}

type IAppProps = OwnProps & StateProps & DispatchProps;

interface IAppState {
    authenicate: boolean,
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
        this.handleCheckAuthenticate();
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
    
    async handleCheckAuthenticate(){
        // await this.props.checkAuthenticate(this.props.auth);
        // const {auth} = this.props;
        // if(!auth.token){
        //     history.push("/login");
        // }
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
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" component={Login}/>
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

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    checkAuthenticate: (auth) => dispatch(checkAuthenticate(auth))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

// export default App;
