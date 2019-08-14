import React from 'react';
import { Avatar, Col, Input, List, Row, Layout, Menu, Icon, Breadcrumb } from 'antd';

import { IconText } from './component/IconText';
import axios from 'axios';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Index from './pages/ProductOrder';
import Detail from './pages/ProductOrder/detail';

import LeftMenu from './components/LeftMenu';
import MainContent from './components/MainContent';
import './App.css';
import { API } from "./service/API";

const { Search } = Input;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component<IAppProps, IAppState> {

    private listData: any[] = new Array();

    constructor(props: {}) {
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

        this.state = {
            collapsed: false,
        };
    }

    onCollapse = (collapsed: boolean) => {
        console.log(collapsed);
        this.setState({ collapsed });
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
        return (
            <Layout>
                <LeftMenu></LeftMenu>
                <Layout style={{ marginLeft: 200 }}>
                    <MainContent></MainContent>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
        return (
            <main className="contaier">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Index} />
                        <Route path="/:name" component={Detail} />
                    </Switch>
                </Router>
            </main>
        );
        return (
            <section className="App">
                <Row type="flex" justify="center">
                    <Col span={16}>
                        <Search placeholder="input search text" onChange={value => console.log(value)} enterButton />
                    </Col>
                    <Col span={16}>
                        <List itemLayout="vertical" size="large" pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                            dataSource={this.listData}
                            footer={
                                <div>
                                    <b>ant design</b> footer part
                                  </div>
                            }
                            renderItem={item => (
                                <List.Item
                                    key={item.title}
                                    actions={[
                                        <IconText text={12} />,
                                        <IconText text={'long'} />,
                                        <IconText text={'adayroi'} />,
                                    ]}
                                    extra={
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} />}
                                        title={<a href={item.href}>{item.title}</a>}
                                        description={item.description}
                                    />
                                    {item.content}
                                </List.Item>
                            )} />
                    </Col>
                </Row>
            </section>
        )
    }
}

interface IAppProps {

}

interface IAppState {
    collapsed: boolean
}
export default App;
