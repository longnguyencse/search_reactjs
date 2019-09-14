import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

import {exeGetSuppierProductDetail as getSuppierProductDetail} from '../../../store/order/dynamic/actions';

import { Order } from '../../../store/order/static/types';
import { AppState } from '../../../store';
import { connect } from 'react-redux';

interface OwnProps {
    form: any,
    k?: any
    loadValue?: any,
    values?: any
}

interface DispatchProps {
}

interface StateProps {
    supplierId?: any
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

class SelectProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(){
    }

    receiveProduct = async (productId: number | string) => {
        const allFields = this.props.form.getFieldsValue();
        const prices = allFields.price;
        const selectedKey = this.props.k;

        const supplierProductDetail = await getSuppierProductDetail(this.props.supplierId, productId);

        prices[selectedKey] = supplierProductDetail.price;
        this.props.form.setFieldsValue({
            price: prices
        });
    }

    render(){
        const { form, k, loadValue, values } = this.props;

        let elementId = "product";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Product";

        const placeholder = "Please select your product";

        const rules = [
            {
                required: true,
                message: 'Please select your product',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
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

                onChange = {(productId: number | string) => this.receiveProduct(productId)}
            />
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    supplierId: state.orderSupplierProduct.supplierId
})

export default connect(mapStateToProps, null)(SelectProduct);
