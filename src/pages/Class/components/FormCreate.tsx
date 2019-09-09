import React from 'react';

import {Button, Col, Form, Row} from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import InputNote from './InputNote';

import {createMulti} from '../../../store/Class/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';
import {Class} from "../../../store/Class/static/types";

interface OwnProps {
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    createMulti: typeof createMulti
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    data: any,
    loading: boolean,
    disabledButton: boolean,
}

let categoryNumber: number = 1;

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            disabledButton: false
        };
    }

    componentWillReceiveProps(newProps: any) {
        console.log('new props', newProps);
        this.setState({
            data: newProps.data,
        });
    }

    getFields(keys: any) {
        const {form} = this.props;
        let buttonRemove: any = null;

        const childrens = keys.map((k: any, value: any) => {
            if (k > 0) {
                buttonRemove = (
                    <Col span={2}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemoveProduct(k)}>X</Button>
                        </Form.Item>
                    </Col>
                );
            }

            return (
                <div key={k}>
                    <Col span={7}>
                        <InputCode form={form} k={k}/>
                    </Col>
                    <Col span={7}>
                        <InputName form={form} k={k}/>
                    </Col>
                    <Col span={8}>
                        <InputNote form={form} k={k}/>
                    </Col>
                    {buttonRemove}
                </div>
            )
        });

        return childrens;
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            loading: false,
            disabledButton: false
        });
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const {data} = this.state;
        let maxKey = 0;
        if (data.length) {
            maxKey = Math.max.apply(Math, data.map((group: any, index: any) => {
                return group.key;
            }));
        }

        this.props.form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }
            this.setState({
                loading: true,
                disabledButton: true
            });

            setTimeout(() => {
                const {keys, groupName, groupCode, groupNote} = values;
                const data = keys.map((value: any, index: any) => {
                    maxKey++;
                    return {
                        key: maxKey,
                        code: groupCode[value],
                        name: groupName[value],
                        note: groupNote[value],
                    };
                });

                this.props.createMulti(data);

                this.handleReset();

            }, LOADING_TIMEOUT);
        });


    };

    handleAddMore = () => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(categoryNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleRemoveProduct = (i: any) => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== i),
        });


    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: [0]});
        const keys = getFieldValue('keys');
        const {loading, disabledButton} = this.state;
        return (
            <div id="create-category">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit}>
                    <h1>Create Form</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset} disabled={disabledButton}>
                                Reset
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleAddMore} disabled={disabledButton}>
                                Add More
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    data: state.staticClassReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMulti: (data: Class[]) => dispatch(createMulti(data)),
});

const CreateForm = Form.create({name: 'create_form'})(Create);

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
