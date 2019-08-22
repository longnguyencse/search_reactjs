import React from 'react';

import {Button, Col, Form, Input, Row} from 'antd';

import SelectSupplier from './components/SelectSupplier';

interface ICreateProductProps {
    form?: any,
}

interface ICreateProductState {
    expand: boolean
}

class CreateProduct extends React.Component<ICreateProductProps, ICreateProductState> {
    constructor(props: ICreateProductProps) {
        super(props);

        this.state = {
            expand: false,
        };

        this.handleReset = this.handleReset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = (
            <div>
                <Col span={8}>
                    <Form.Item label={`Supplier`}>
                        {getFieldDecorator(`field-supplier`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<SelectSupplier />)}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={`Product Name`}>
                        {getFieldDecorator(`field-productName`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder" />)}
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={`Product Code`}>
                        {getFieldDecorator(`field-productCode`, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder="placeholder" />)}
                    </Form.Item>
                </Col>
            </div>
        );
        return children;
    }

    handleReset() {
        this.props.form.resetFields();
    }

    toggle() {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    handSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            console.log('Received values of form: ', values);
        });
    };

    render() {
        // const {expand} = this.state;
        return (
            <div id="create-product">
                <Form className="ant-advanced-search-form" onSubmit={this.handSubmit}>
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const CreateProductForm = Form.create({ name: 'create_product_form' })(CreateProduct);

export default CreateProductForm;
