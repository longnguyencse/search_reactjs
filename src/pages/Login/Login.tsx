import React, { Component } from 'react';
import { Button, Checkbox, Form, Icon, Input, Layout } from 'antd';

import './login.scss';

import {AuthState} from '../../store/auth/types';
import {loginSystem, logoutSystem, checkAuthenticate, _loginSystem} from '../../store/auth/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import {Redirect} from 'react-router-dom';

import { ThunkDispatch } from 'redux-thunk';

const { Content } = Layout;


export interface ILoginState {
    isRedirect: boolean,
    loading: boolean,
}

export interface OwnProps {
    form?: any,

}

export interface StateProps {
    auth: AuthState,
}

export interface DispatchProps {
    loginSystem: typeof loginSystem,
    // logoutSystem: typeof logoutSystem,
    checkAuthenticate: typeof checkAuthenticate,
    // _loginSystem: typeof _loginSystem,
}

export type ILoginProps = OwnProps & StateProps & DispatchProps;

class Login extends Component<ILoginProps, ILoginState> {
    constructor(props: ILoginProps) {
        super(props);

        console.warn = function(){
            return;
        }

        this.state = {
            isRedirect: false,
            loading: true,
        }
    }

    componentDidMount(){
        this.handleCheckAuthenticate();

        // console.log("componentDidMount - Loading....")
        // await this.props.checkAuthenticate(this.props.auth);

        // const {auth} = this.props;

        // console.log("componentDidMount - Compelete...", auth)
        
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            if (!err) {
                const {userName, password, rememberMe} = values;

                const loginInfo = {
                    userName, password, rememberMe
                };

                this.props.loginSystem(userName, password);

                this.handleCheckAuthenticate();
            }
        });
    };

    async handleCheckAuthenticate(){
        await this.props.checkAuthenticate(this.props.auth);

        const {auth} = this.props;
        if(auth.token){
            this.setState({
                loading: false,
                isRedirect: true,
            });
        }
        else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { loading, isRedirect } = this.state;
        if(loading){
            return <h1>Loading...</h1>;
        }

        if(isRedirect){
            return <Redirect to="/" />
        }

        console.log("Render", {loading, isRedirect});

        return (
            <div>
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
            </div>
        );

    }
}

const LoginForm = Form.create({})(Login);


const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    auth: state.auth,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    loginSystem: (userName, password) => dispatch(loginSystem(userName, password)),
    checkAuthenticate: (auth) => dispatch(checkAuthenticate(auth))
    // return {
    //     loginSystem: loginSystem,
    //     logoutSystem: logoutSystem,
    //     checkAuthenticate: (auth) => dispatch(checkAuthenticate(auth)),
    //     _loginSystem: _loginSystem,
    // }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

