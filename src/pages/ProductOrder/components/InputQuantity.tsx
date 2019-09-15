import React from 'react';

import CustomInputNumber from '../../../components/CustomForm/InputNumber';

interface OwnProps {
    form?: any,
    k?: any
    loadValue?: any
}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

export default class InputQuantity extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
    }

    receiveQuantity = (quanity: number) => {
        const allFields = this.props.form.getFieldsValue();
        const prices = allFields.price;
        const moneyArr = allFields.money;
        const selectedKey = this.props.k;

        const currentPrice = prices[selectedKey];
        const currentMoney = currentPrice * quanity;

        moneyArr[selectedKey] = currentMoney;
        this.props.form.setFieldsValue({
            money: moneyArr
        });
    }

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "quantity";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Số lượng";

        const placeholder = "Vui lòng nhập số lượng";

        const rules = [
            {
                required: true,
                message: 'Vui lòng nhập số lượng',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
        }

        return (
            <CustomInputNumber 
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules = {rules}

                initialValue={initialValue}

                minValue = {0}

                onChange = {(quantity: any) => {this.receiveQuantity(quantity)}}
            />
        );
    }
}
