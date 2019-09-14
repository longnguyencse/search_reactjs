import React from "react";
import {Empty} from 'antd';

import FormCreate from './components/FormCreate';

import { Order } from '../../store/order/static/types';
import { list } from '../../store/order/static/actions';

import {executeList as getSuppliers} from '../../store/supplier/dynamic/actions';

import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {

}

interface StateProps {

}

interface DispatchProps {

}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    suppliers: any,
    products: any,
}

const _suppliers = [
    {
        id: 1, 
        name: "Supplier 01"
    },
    {
        id: 2, 
        name: "Supplier 02"
    },
    {
        id: 3, 
        name: "Supplier 03"
    },
    {
        id: 4, 
        name: "Supplier 04"
    },
    {
        id: 5, 
        name: "Supplier 05"
    }
];

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            suppliers: [],
            products: []
        }
    }

    componentWillReceiveProps(newProps: any){
        console.log(newProps)
        if(newProps.products){
            this.setState({
                products: newProps.products
            });
        }
    }

    async componentDidMount(){
        const responseSupplier: any = await getSuppliers(0, 10000);

        const suppliers = responseSupplier && responseSupplier.suppliers ? responseSupplier.suppliers : [];
        this.setState({
            suppliers
        });
        this.setState({
            suppliers
        });
    }

    render() {
        console.log("this.state.products", this.state.products)
        return (
            <FormCreate 
                suppliers = {this.state.suppliers}

                products = {this.state.products}
            />
            // <Empty/>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    products: state.orderSupplierProduct.products,
});

export default connect(
    mapStateToProps,
    null
)(CreateProductOrder);

// export default CreateProductOrder;
