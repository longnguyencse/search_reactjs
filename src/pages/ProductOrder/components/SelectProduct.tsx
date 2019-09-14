import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

interface OwnProps {
    form: any,
    k?: any
    loadValue?: any,
    values?: any
}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

export default class SelectProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(){
        console.log("Select dimout")
    }

    receiveProduct = (productId: number | string) => {
        // this.props.form.setFieldsValue({
        //     price: `Hi, ${productId}`
        // });
        // const allFields = this.props.form.getFieldsValue();
        // const allValueInFieldPrice = allFields.price.filter();
        
        // this.props.form.setFieldsValue({
        //     price: ["1", "3", "4"]
        // });

        const allFields = this.props.form.getFieldsValue();
        // const keys = allFields.keys;
        const prices = allFields.price;
        const selectedKey = this.props.k;
        prices[selectedKey] = productId;
        this.props.form.setFieldsValue({
            price: prices
        })
        console.log("Select Product", this.props.form.getFieldsValue())
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