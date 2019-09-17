import React from "react";
import {Button, Table} from 'antd';

import FormCreate from './components/FormCreate';

import {Order} from '../../store/order/static/types';
import {list} from '../../store/order/static/actions';

import {createMulti as saveAll} from '../../store/order/dynamic/actions';

import {executeList as getSuppliers} from '../../store/supplier/dynamic/actions';

import {AppState} from '../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {LOADING_TIMEOUT} from "../../constants";
import { Redirect } from "react-router";

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
    redirectToList: boolean
}

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            suppliers: [],
            products: [],
            order: null,
            saveAllLoading: false,
            redirectToList: false
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

        if (newProps.order) {
            dataToSetState.order = newProps.order;
        }

        if (newProps.products) {
            dataToSetState.products = newProps.products;
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
                            {/* <Button onClick={() => this.handleClickUpdate(row.key)}>Update - {row.key}</Button>
                            -
                            <Button onClick={() => this.handleClickRemove(row.key)}>Delete - {row.key}</Button> */}
                        </div>
                    );
                },
            },
        ];

        const { order, saveAllLoading, redirectToList } = this.state;
        const checkExist = order && order.supplierId ? true : false;

        if(redirectToList){
            return <Redirect to="/po" />
        }

        return (
            <div id="create-order">
                <div className="search-result-list">
                    <FormCreate
                        suppliers={this.state.suppliers}

                        products={this.state.products}
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
