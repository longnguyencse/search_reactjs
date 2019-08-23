import React from 'react';

import {Button, Col, Form, Row, Table} from 'antd';

import SupplierSelect from './components/SupplierSelect';
import ProductNameInput from './components/ProductNameInput';
import ProductCodeInput from './components/ProductCodeInput';

interface ICreateProductProps {
    form?: any,
}

interface ICreateProductState {
    expand: boolean,
    productNumber: number,
    products: any,
}

let productNumber:number = 1;

const columns = [
    {
        title: "Nha cung cap",
        dataIndex: "nhaCungCap",
    },
    {
        title: "Ten san pham",
        dataIndex: "tenSanPham",
    },
    {
        title: "Ma san pham",
        dataIndex: "maSanPham",
    },
    {
        title: "Action",
        dataIndex: "action",
        render: () => <a href="#">Update</a>,
    },

];

class CreateProduct extends React.Component<ICreateProductProps, ICreateProductState> {
    constructor(props: ICreateProductProps) {
        super(props);

        this.state = {
            expand: false,
            productNumber: 1,
            products: null
        };

        this.handleReset = this.handleReset.bind(this);
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddMore = this.handleAddMore.bind(this);
        this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    componentWillMount(){
        const {products} = this.state;
        if(!products){
            return;
        }
    }

    getFields(keys:any) {
        // const count = this.state.productNumber;
        const { form } = this.props;
        let buttonRemove:any = null;

        const childrens = keys.map((k: any, value: any) => {
            if(k > 0){
                buttonRemove = (
                    <Col span={3}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemoveProduct(k)}>X</Button>
                        </Form.Item>
                    </Col>
                );
            }
            return (
                <div key={k}>
                    <Col span={7}>
                        <SupplierSelect form={form} k={k}/>
                    </Col>
                    <Col span={7}>
                        <ProductNameInput form={form} k={k} />
                    </Col>
                    <Col span={7}>
                        <ProductCodeInput form={form} k={k} />
                    </Col>
                    {buttonRemove}
                </div>
            )
        });

        return childrens;
    }

    handleReset() {
        this.props.form.resetFields();
    }

    toggle() {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            const {keys, supplier, productName, productCode}= values;
            const products = keys.map((k:any, index:any) => {
                return {
                    nhaCungCap: supplier[k],
                    tenSanPham: productName[k],
                    maSanPham: productCode[k]  
                };
            });
            this.setState({
                products
            });
            console.log('Received values of form: ', products);
        });
    };

    handleAddMore(){
        const {form} = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(productNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleRemoveProduct(i:any){
        const { form } = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key:any) => key !== i),
        });


    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        return (
            <div id="create-product">
                <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Reset
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleAddMore}>
                                Add More
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="search-result-list">
                    <Table pagination={false} columns={columns} dataSource={this.state.products} />
                </div>
            </div>
        );
    }
}

const CreateProductForm = Form.create({ name: 'create_product_form' })(CreateProduct);

export default CreateProductForm;
