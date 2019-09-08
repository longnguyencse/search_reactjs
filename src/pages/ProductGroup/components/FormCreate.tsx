import React from 'react';

import {Button, Col, Form, Row} from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import InputNote from './InputNote';

import {createMulti} from '../../../store/group/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';
import {ProductGroup} from "../../../store/group/static/types";

interface OwnProps {
}

interface StateProps {
    groups: ProductGroup[]
}

interface DispatchProps {
    createMulti: typeof createMulti
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    groups: any,
    loading: boolean,
    disabledButton: boolean,
}

let categoryNumber: number = 1;

class CreateCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            groups: [],
            loading: false,
            disabledButton: false
        };
    }

    componentWillReceiveProps(newProps: any) {
        console.log('new props', newProps);
        this.setState({
            groups: newProps.groups,
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
        const {groups} = this.state;
        console.log('group : ', groups);
        let maxKey = 0;
        if (groups.length) {
            maxKey = Math.max.apply(Math, groups.map((group: any, index: any) => {
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
    groups: state.staticGroupReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMulti: (groups: ProductGroup[]) => dispatch(createMulti(groups)),
});

const CreateCategoryForm = Form.create({name: 'create_category_form'})(CreateCategory);

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryForm);
