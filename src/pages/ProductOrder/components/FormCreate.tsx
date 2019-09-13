import React from 'react';

import { Button, Col, Form, Row } from 'antd';

import SelectSupplier from './SelectSupplier';
import SelectProduct from './SelectProduct';
import InputQuantity from './InputQuantity';
import InputPrice from './InputPrice';
import InputMoney from './InputMoney';
import InputDiscount from './InputDiscount';

import { Order } from '../../../store/order/static/types';
import { createMulti } from '../../../store/order/static/actions';
import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { FormComponentProps } from 'antd/es/form';

import { LOADING_TIMEOUT } from '../../../constants';
import { string } from 'prop-types';
// import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    suppliers?: any,
    products?: any
}

interface StateProps {
    supplierId: number | string
    // productOrders: Product[]
}

interface DispatchProps {
    // createMulti: typeof createMulti
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    // supplierId: number | string,
    productOrders: any,
    loading: boolean,
    disabledButton: boolean,
}

let productNumber: number = 1;

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            // supplierId: 0,
            productOrders: [],
            loading: false,
            disabledButton: false
        };
    }

    componentDidUpdate(prevProps: any){
        if(prevProps.supplierId !== this.props.supplierId){
            const allFieldsValue = this.props.form.getFieldsValue();
            const allFieldsToReset = Object.keys(allFieldsValue).filter((key: any) => {
                return key !== "supplier" && key !== "keys";
            });

            this.props.form.resetFields(allFieldsToReset);
        }
        return false;
    }

    componentWillReceiveProps(newProps: any) {
        console.log('new props', newProps);
        // this.setState({
        //     productOrders: newProps.productOrders,
        // });
    }

    getFields(keys: any) {
        const { form, products } = this.props;
        console.log("getFields", products);
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

            // return (
            //     <div key={k}>

            //     </div>
            // );

            return (
                <div key={k}>
                    <Col span={6}>
                        <SelectProduct form={form} k={k} values={products} />
                    </Col>
                    <Col span={4}>
                        <InputQuantity form={form} k={k} />
                    </Col>
                    <Col span={4}>
                        <InputPrice form={form} k={k} />
                    </Col>
                    <Col span={4}>
                        <InputMoney form={form} k={k} />
                    </Col>
                    <Col span={4}>
                        <InputDiscount form={form} k={k} />
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
        const { productOrders } = this.state;

        let maxKey = 0;
        if (productOrders.length) {
            maxKey = Math.max.apply(Math, productOrders.map((product: any, index: any) => {
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

                // this.props.createMulti(newProduct);

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
        const { form, suppliers } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const { loading, disabledButton } = this.state;
        return (
            <div id="create-product-order">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit} >
                    <h1>Create Form</h1>
                    <Row>
                        <SelectSupplier form={form} values={suppliers} />
                    </Row>
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

// const CreateProductOrderForm = Form.create({ name: 'create_product_order_form' })(CreateProductOrder);

// export default CreateProductOrderForm;

// const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
//     productOrders: state.staticProducts,
// });

// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
//     createMulti: (productOrders: Product[]) => dispatch(createMulti(productOrders)),
// });

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    supplierId: state.product1.supplierId
})

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => {
    return {};
};

const CreateProductOrderForm = Form.create({ name: 'create_product_order_form' })(CreateProductOrder);

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductOrderForm);
