import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

import { getProducts } from '../../../store/order/static/actions';

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
    getProducts: typeof getProducts
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

class SelectSupplier extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(){
        console.log("Select dimout")
    }

    receiveSupplier = (supplierId: number | string) => {
        this.props.getProducts(supplierId);
        console.log("SelectSupplier", supplierId);
    }

    render(){
        const { form, k, loadValue, values } = this.props;

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

        return (
            <CustomSelect 
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules = {rules}

                initialValue={initialValue}

                values={values}


                onChange={(supplierId: number | string) => { this.receiveSupplier(supplierId) }}
            />
        );
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    getProducts: (supplierId: number | string) => dispatch(getProducts(supplierId)),
});

export default connect(
    null,
    mapDispatchToProps
)(SelectSupplier);