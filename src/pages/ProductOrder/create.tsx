import React from "react";
import { Button, Table } from 'antd';

import FormCreate from './components/FormCreate';
import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import { Order } from '../../store/order/static/types';
import { list } from '../../store/order/static/actions';

import { createMulti as saveAll, exeGetProductsBelongSupplier } from '../../store/order/dynamic/actions';

import { executeList as getSuppliers } from '../../store/supplier/dynamic/actions';

import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';
import { LOADING_TIMEOUT } from "../../constants";
import { Redirect } from "react-router";
import { filerTwoArrayObjectByAttribute } from "../../helpers";

interface OwnProps {

}

interface StateProps {
    products: any,
    order: Order
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    suppliers: any,
    products: any,
    order: any,
    saveAllLoading: boolean,
    redirectToList: boolean,
    productId: any,
    openUpdateModal: boolean,
    openRemoveModal: boolean
}

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            suppliers: [],
            products: [],
            order: null,
            saveAllLoading: false,
            redirectToList: false,
            productId: null,
            openUpdateModal: false,
            openRemoveModal: false
        }

        console.warn = function () {
            return;
        }

        console.error = function () {
            return;
        }
    }

    componentWillReceiveProps(newProps: any) {
        const dataToSetState: any = {};
        let exceptProducts = [];

        if (newProps.order) {
            const { order } = newProps;
            dataToSetState.order = order;
            if(order.items){
                exceptProducts = order.items;
            }
        }

        if (newProps.products) {
            let { products } = newProps;
            // if(exceptProducts.length){
            //     console.log({
            //         products,
            //         exceptProducts
            //     });
            //     products = filerTwoArrayObjectByAttribute(products, exceptProducts, "productId", "id");
            // }
            dataToSetState.products = products;
        }

        this.setState(dataToSetState);
    }

    async componentDidMount() {
        await this.props.list();

        const dataToSetState: any = {};

        if (this.props.order) {
            dataToSetState.order = this.props.order;
        }


        const responseSupplier: any = await getSuppliers(0, 10000);
        const suppliers = responseSupplier && responseSupplier.suppliers ? responseSupplier.suppliers : [];

        dataToSetState.suppliers = suppliers;

        this.setState(dataToSetState);
    }

    handleClickUpdate = (productId: any) => {
        if (productId) {
            this.setState({
                productId,
                openUpdateModal: true
            })
        }
    }

    handleClickRemove = async (productId: any) => {
        if(productId){
            this.setState({
                productId,
                openRemoveModal: true
            })
        } 
    }

    handleSaveAll = () => {
        this.setState({
            saveAllLoading: true
        });
        setTimeout(async () => {
            await this.props.saveAll(this.state.order);
            this.setState({
                products: [],
                redirectToList: true,
                saveAllLoading: false
            });

        }, LOADING_TIMEOUT);

    }

    render() {
        const columns = [
            {
                title: "Tên sản phẩm",
                dataIndex: "productId",
            },
            {
                title: "Giá",
                dataIndex: "price",
            },
            {
                title: "Số lượng",
                dataIndex: "quantity",
            },
            {
                title: "Thành tiền",
                dataIndex: "money",
            },
            {
                title: "Chiết khấu",
                dataIndex: "discount",
            },
            {
                title: "Thao tác",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.productId)}>Cập nhật</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.productId)}>Xóa</Button>
                        </div>
                    );
                },
            },
        ];

        const { suppliers, products, order, saveAllLoading, redirectToList, productId, openUpdateModal, openRemoveModal } = this.state;
        const checkExist = order && order.supplierId ? true : false;

        if (redirectToList) {
            return <Redirect to="/po" />
        }

        return (
            <div id="create-order">
                <div className="search-result-list">
                    <FormCreate
                        suppliers={suppliers}

                        products={products}
                    />

                    <ModalUpdate
                        productId={productId}

                        visible={openUpdateModal}

                        products={products}

                        onCancel={() => { this.setState({ openUpdateModal: false }) }}
                    />

                    <ModalRemove
                        productId={productId}

                        visible={openRemoveModal}

                        onCancel={() => { this.setState({ openRemoveModal: false }) }}
                    />

                    {checkExist ?
                        <Table pagination={false} columns={columns} dataSource={order.items} rowKey="key" />
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
                        onClick={this.handleSaveAll}>  Xác nhận tạo sản phẩm  </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    products: state.orderSupplierProduct.products,
    order: state.staticOrder
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (order: any) => dispatch(saveAll(order))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProductOrder);

// export default CreateProductOrder;
