import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

import { getProductsBelongSupplier } from '../../../store/order/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
    form: any,
    k?: any
    loadValue?: any,
    values?: any
}

interface DispatchProps {
    getProductsBelongSupplier: typeof getProductsBelongSupplier
}

interface StateProps {
    orders?: any
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    disabled: boolean,
    loadValue: any
}

class SelectSupplier extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            disabled: false,
            loadValue: null
        }
    }

    componentDidMount(){
        // console.log("Select Didmount Select Supplier", this.props);
    }

    componentWillReceiveProps(newProps: any){
        if(newProps.orders.length){
            const orders = newProps.orders;
            // console.log(orders);
            const order = orders[0];
            
            this.setState({
                disabled: true,
                loadValue: order.supplierId["undefined"]
            });
        }
    }

    receiveSupplier = async (supplierId: number | string) => {
        await this.props.getProductsBelongSupplier(supplierId);
        console.log("SelectSupplier", supplierId);
    }

    render(){
        const { form, k, loadValue, values } = this.props;

        const stateLoadValue = this.state.loadValue;

        let elementId = "supplier";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Supplier";

        const placeholder = "Please select your supplier";

        const rules = [
            {
                required: true,
                message: 'Please select your supplier',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
        }

        if(stateLoadValue){
            initialValue = stateLoadValue;
        }

        return (
            <CustomSelect 
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules = {rules}

                initialValue={initialValue}

                values={values}

                disabled={this.state.disabled}

                onChange={(supplierId: number | string) => { this.receiveSupplier(supplierId) }}
            />
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    orders: state.staticOrder
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    getProductsBelongSupplier: (supplierId: number | string) => dispatch(getProductsBelongSupplier(supplierId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectSupplier);