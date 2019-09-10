import React from 'react';

import { Button, Col, Form, Row, Table } from 'antd';

import FormCreate from './components/FormCreate';
import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import { Product } from '../../store/product/static/types';
import { list } from '../../store/product/static/actions';

import { createMulti as saveAll } from '../../store/product/dynamic/actions';

import { executeList as getCategories } from '../../store/category/dynamic/actions';

import { AppState } from '../../store';
import { connect } from 'react-redux';


import { ThunkDispatch } from 'redux-thunk';
import { LOADING_TIMEOUT } from '../../constants';
import { Redirect } from 'react-router';

interface OwnProps {
}

interface StateProps {
    products: {}
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll,
}

type ICreateProductProps = OwnProps & StateProps & DispatchProps;

interface ICreateProductState {
    products: any,
    productKey: any,
    openUpdateModal: boolean,
    openRemoveModal: boolean,
    categories: any,
    redirectToList: boolean,
    saveAllLoading: boolean
}

class CreateProduct extends React.Component<ICreateProductProps, ICreateProductState> {
    constructor(props: ICreateProductProps) {
        super(props);

        this.state = {
            products: [],
            productKey: null,
            openUpdateModal: false,
            openRemoveModal: false,
            categories: [],
            redirectToList: false,
            saveAllLoading: false
        };
    }

    componentWillReceiveProps(newProps: any) {
        console.log(newProps);
        const { products } = newProps;
        this.setState({
            products,
        });
    }

    async componentDidMount() {
        await this.props.list();

        const products = this.props.products;

        const response: any = await getCategories(0, 10000);
        const categories = response && response.categories ? response.categories : [];
        this.setState({
            products,
            categories
        });
    }

    handleClickUpdate = (productKey: any) => {
        if (productKey) {
            this.setState({
                openUpdateModal: true,
                productKey
            })
        }
    }

    handleClickRemove = async (productKey: any) => {
        this.setState({
            productKey,
            openRemoveModal: true
        })
    }

    handleSaveAll = () => {
        this.setState({
            saveAllLoading: true
        });
        setTimeout(async () => {
            console.log(this.state.products);
            await this.props.saveAll(this.state.products);
            this.setState({
                products: [],
                redirectToList: true,
                saveAllLoading: false
            });

        }, LOADING_TIMEOUT);

        console.log("Save all");
    }

    render() {
        const columns = [
            {
                title: "Ma san pham",
                dataIndex: "code",
            },
            {
                title: "Ten san pham",
                dataIndex: "name",
            },
            {
                title: "Note",
                dataIndex: "note",
            },
            {
                title: "Category",
                dataIndex: "categoryId",
            },
            {
                title: "Group",
                dataIndex: "groupId",
            },
            {
                title: "Class",
                dataIndex: "classId",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button onClick={() => this.handleClickUpdate(row.key)}>Update - {row.key}</Button>
                            -
                            <Button onClick={() => this.handleClickRemove(row.key)}>Delete - {row.key}</Button>
                        </div>
                    );
                },
            },

        ];

        const { products, redirectToList, saveAllLoading } = this.state;
        const checkExist = products.length;

        if (redirectToList) {
            return <Redirect to="/products" />
        }

        return (
            <div id="create-product">
                <div className="search-result-list">
                    <FormCreate 
                        categories={this.state.categories}
                    />

                    <ModalUpdate
                        productKey={this.state.productKey}

                        visible={this.state.openUpdateModal}

                        onCancel={() => { this.setState({ openUpdateModal: false }) }}

                        categories={this.state.categories}
                    />

                    <ModalRemove
                        productKey={this.state.productKey}

                        visible={this.state.openRemoveModal}

                        onCancel={() => { this.setState({ openRemoveModal: false }) }}
                    />

                    {checkExist ?
                        <Table pagination={false} columns={columns} dataSource={products} rowKey="key" />
                        : null
                    }

                    <Button
                        style={
                            {
                                display: !checkExist ? "none" : "block"
                            }
                        }
                        className="confirm-create-all"
                        type="primary"
                        loading={saveAllLoading}
                        onClick={this.handleSaveAll}> Confirm create all products </Button>
                </div>
            </div>
        );
    }
}

const CreateProductForm = Form.create({ name: 'create_product_form' })(CreateProduct);

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    products: state.staticProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (products: any) => dispatch(saveAll(products))

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProductForm);
