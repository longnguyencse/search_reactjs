import React from "react";
import { Table } from 'antd';

import FormCreate from './components/FormCreate';

import { Order } from '../../store/order/static/types';
import { list } from '../../store/order/static/actions';

import { executeList as getSuppliers } from '../../store/supplier/dynamic/actions';

import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {

}

interface StateProps {
    products: any,
    orders: Order[]
}

interface DispatchProps {
    list: typeof list
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    suppliers: any,
    products: any,
    orders: any
}

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            suppliers: [],
            products: [],
            orders: []
        }
    }

    componentWillReceiveProps(newProps: any) {
        console.log(newProps)
        if (newProps.products) {
            this.setState({
                products: newProps.products
            });
        }
    }

    async componentDidMount() {
        await this.props.list();

        const dataToSetState: any = {};

        if (this.props.orders) {
            dataToSetState.orders = this.props.orders;
        }

        const responseSupplier: any = await getSuppliers(0, 10000);
        const suppliers = responseSupplier && responseSupplier.suppliers ? responseSupplier.suppliers : [];

        dataToSetState.suppliers = suppliers;

        this.setState(dataToSetState);
    }

    render() {
        const columns = [
            {
                title: "Ten san pham",
                dataIndex: "productId",
            },
            {
                title: "Gia",
                dataIndex: "price",
            },
            {
                title: "So luong",
                dataIndex: "quantity",
            },
            {
                title: "Thanh tien",
                dataIndex: "money",
            },
            {
                title: "Giam gia",
                dataIndex: "discount",
            },
            {
                title: "Action",
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

        const { orders } = this.state;
        const checkExist = orders.length;

        return (
            <div id="create-order">
                <div className="search-result-list">
                <FormCreate
                    suppliers={this.state.suppliers}

                    products={this.state.products}
                />

                {checkExist ?
                    <Table pagination={false} columns={columns} dataSource={orders[0]["items"]} rowKey="key" />
                    : null
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    products: state.orderSupplierProduct.products,
    orders: state.staticOrder
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProductOrder);

// export default CreateProductOrder;