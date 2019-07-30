import React from 'react';
import {Avatar, Col, Input, List, Row} from 'antd';
import {IconText} from './component/IconText';

import './App.css';

const {Search} = Input;

class App extends React.Component<{}, {}> {

    private listData: any[] = new Array();

    constructor(props: {}) {
        super(props);
        for (let i = 0; i < 23; i++) {
            this.listData.push({
                href: 'http://ant.design',
                title: `ant design part ${i}`,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                description:
                    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
                content:
                    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            });
        }
    }

    render() {
        return (
            <section className="App">
                <Row type="flex" justify="center">
                    <Col span={16}>
                        <Search placeholder="input search text" onChange={value => console.log(value)} enterButton/>
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
                                          <IconText text={12}/>,
                                          <IconText text={'long'}/>,
                                          <IconText text={'adayroi'}/>,
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
                                          avatar={<Avatar src={item.avatar}/>}
                                          title={<a href={item.href}>{item.title}</a>}
                                          description={item.description}
                                      />
                                      {item.content}
                                  </List.Item>
                              )}/>
                    </Col>
                </Row>
            </section>
        )
    }
}
export default App;
