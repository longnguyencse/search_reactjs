import React from 'react';

import {Button, Col, Form, Row, Table} from 'antd';

import CategoryCodeInput from './components/CategoryCodeInput';
import CategoryNameInput from './components/CategoryNameInput';
import CategoryNoteTextArea from './components/CategoryNoteTextArea';

// import {Product} from '../../store/product/types';
// import { AppState } from '../../store';
// import { connect } from 'react-redux';

// import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
    form?: any
}

interface StateProps {
    // products: {}
}

interface DispatchProps {
    // createMultiProduct: typeof createMultiProduct,
}

type ICreateCategoryProps = OwnProps & StateProps & DispatchProps;

interface ICreateCategoryState {
    categoryNumber: number,
    // products: any,
}

let categoryNumber:number = 1;

// const columns = [
//     {
//         title: "Ten san pham",
//         dataIndex: "name",
//     },
//     {
//         title: "Ma san pham",
//         dataIndex: "code",
//     },
//     {
//         title: "Action",
//         dataIndex: "action",
//         render: (text:any, row:any, index:any) => {
//             return <a href={row.id}>Update</a>;
//         },
//     },

// ];

class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {
    constructor(props: ICreateCategoryProps) {
        super(props);

        this.state = {
            categoryNumber: 1,
        };

        // this.handleReset = this.handleReset.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleAddMore = this.handleAddMore.bind(this);
        // this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    }

    componentWillMount(){
        // const {products} = this.state;
        // if(!products){
        //     return;
        // }
    }

    getFields(keys:any) {
        // const count = this.state.categoryNumber;
        const { form } = this.props;
        let buttonRemove:any = null;

        const childrens = keys.map((k: any, value: any) => {
            if(k > 0){
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
                        <CategoryCodeInput form={form} k={k} />
                    </Col>
                    <Col span={7}>
                        <CategoryNameInput form={form} k={k} />
                    </Col>
                    <Col span={8}>
                        <CategoryNoteTextArea form={form} k={k} />
                    </Col>
                    {buttonRemove}
                </div>
            )
        });

        return childrens;
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields(async (err: any, values: any) => {
            if(err){
                return;
            }
            // const {keys, supplier, productName, productCode}= values;
            // const products = keys.map((value:any, index:any) => {
            //     return {
            //         key: value,
            //         code:  productCode[value], 
            //         name: productName[value],
            //     };
            // });
            // await this.props.createMultiProduct(products);
            // this.setState({
            //     products: this.props.products
            // });
            this.handleReset();
            // console.log('Received values of form: ', products);
            // console.log('Received values of props: ', this.props.products);

        });
    };

    handleAddMore = () => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(categoryNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleRemoveProduct = (i:any) => {
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
        // const {products} = this.state;
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
                {/* <div className="search-result-list">
                    { products ?
                        <Table pagination={false} columns={columns} dataSource={products} rowKey="key"/>
                        : null
                    }
                </div> */}
            </div>
        );
    }
}

const CreateCategoryForm = Form.create({ name: 'create_category_form' })(CreateCategory);

export default CreateCategoryForm;

// const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
//     products: state.products.createMultiProduct,
// });

// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
//     createMultiProduct: (products) => dispatch(createMultiProduct(products)),
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(CreateCategoryForm);
