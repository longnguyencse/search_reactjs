import React from 'react';

import { Button, Col, Form, Row } from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import TextAreaNote from './TextAreaNote';
import SelectCategory from './SelectCategory';
import SelectGroup from './SelectGroup';
import SelectClass from './SelectClass';

import { Product } from '../../../store/product/static/types';
import { createMulti } from '../../../store/product/static/actions';
import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { FormComponentProps } from 'antd/es/form';

import { LOADING_TIMEOUT } from '../../../constants';
import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    categories: any,
    groups: any,
    classes: any
}

interface StateProps {
    products: Product[]
}

interface DispatchProps {
    createMulti: typeof createMulti
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    products: any,
    loading: boolean,
    disabledButton: boolean,
}

let productNumber: number = 1;

class CreateProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            products: [],
            loading: false,
            disabledButton: false
        };
    }

    componentWillReceiveProps(newProps: any) {
        console.log('new props', newProps);
        this.setState({
            products: newProps.products,
        });
    }

    getFields(keys: any) {
        const { form, categories, groups, classes } = this.props;
        let buttonRemove: any = null;

        const childrens = keys.map((k: any, value: any) => {
            if (k > 0) {
                buttonRemove = (
                    <Col span={2}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemove(k)}>X</Button>
                        </Form.Item>
                    </Col>
                );
            }

            return (
                <div key={k}>
                    <Col span={7}>
                        <InputCode form={form} k={k} />
                    </Col>
                    <Col span={7}>
                        <InputName form={form} k={k} />
                    </Col>
                    <Col span={8}>
                        <TextAreaNote form={form} k={k} />
                    </Col>
                    <Col span={7}>
                        <SelectCategory form={form} k={k} values={categories} />
                    </Col>
                    <Col span={7}>
                        <SelectGroup form={form} k={k} values={groups} />
                    </Col>
                    <Col span={8}>
                        <SelectClass form={form} k={k} values={classes} />
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
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const { products } = this.state;
        const { categories } = this.props;

        let maxKey = 0;
        if (products.length) {
            maxKey = Math.max.apply(Math, products.map((product: any, index: any) => {
                return product.key;
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
                const { keys, productName, productCode, productNote, productCategory, productGroup, productClass } = values;
                const newProduct = keys.map((value: any, index: any) => {
                    maxKey++;
                    return {
                        key: maxKey,
                        code: productCode[value],
                        name: productName[value],
                        note: productNote[value],
                        categoryId: productCategory[value],
                        groupId: productGroup[value],
                        classId: productClass[value],
                    };
                });

                this.props.createMulti(newProduct);

                this.handleReset();

            }, LOADING_TIMEOUT);
        });


    };

    handleAddMore = () => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(productNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleRemove = (i: any) => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== i),
        });


    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const { loading, disabledButton } = this.state;
        return (
            <div id="create-product">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit} >
                    <h1>Create Form</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset} disabled={disabledButton}>
                                Reset
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleAddMore} disabled={disabledButton}>
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
    products: state.staticProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMulti: (products: Product[]) => dispatch(createMulti(products)),
});

const CreateProductForm = Form.create({ name: 'create_product_form' })(CreateProduct);

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductForm);
