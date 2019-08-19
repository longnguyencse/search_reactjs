import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Input, Layout } from 'antd';

import './login.scss';

import {LoginInfoState} from '../../store/login/types';
import {loginSystem} from '../../store/login/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

const { Header, Footer, Content } = Layout;


export interface ILoginState {

}

export interface ILoginProps {
    form?: any,
    loginSystem: typeof loginSystem
    loginInfo: LoginInfoState,
}

class Login extends Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const {userName, password, rememberMe} = values;

                const loginInfo = {
                    userName, password, rememberMe
                };
                this.props.loginSystem(loginInfo);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Header>Header</Header>
                <Content>
                    <div className="content-login">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('rememberMe', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>Remember me</Checkbox>)}
                                <a className="login-form-forgot" href="">
                                    Forgot password
                                </a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                    </Button>
                            </Form.Item>
                        </Form>
                    </div>

                </Content>
                <Footer>Footer</Footer>
            </div>
        );

    }
}

const LoginForm = Form.create({})(Login);


const mapStateToProps = (state: AppState) => ({
    loginInfo: state.login,
});

export default connect(
    mapStateToProps,
    {loginSystem}
)(LoginForm);

