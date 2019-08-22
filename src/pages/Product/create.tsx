import React from 'react';

import { Form, Row, Col, Input, Button, Icon } from 'antd';

interface ICreateProductProps {
    form?: any,
}

interface ICreateProductState {
    expand: boolean
}

class CreateProduct extends React.Component <ICreateProductProps, ICreateProductState> {
    constructor(props: ICreateProductProps){
        super(props);

        this.state = {
            expand: false,
        };

        this.handleReset = this.handleReset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    getFields(){
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
        children.push(
            <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
            <Form.Item label={`Field ${i}`}>
                {getFieldDecorator(`field-${i}`, {
                rules: [
                    {
                    required: true,
                    message: 'Input something!',
                    },
                ],
                })(<Input placeholder="placeholder" />)}
            </Form.Item>
            </Col>,
        );
        }
        return children;
    }

    handleReset(){
        this.props.form.resetFields();
    }

    toggle(){
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    handSubmit = (e:any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
          console.log('Received values of form: ', values);
        });
      };

    render(){
        // const {expand} = this.state;
        return (
            <div id="create-product">
                <Form className="ant-advanced-search-form" onSubmit={this.handSubmit}>
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                            Search
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            Clear
                            </Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const CreateProductForm = Form.create({ name: 'create_product_form' })(CreateProduct);

export default CreateProductForm;