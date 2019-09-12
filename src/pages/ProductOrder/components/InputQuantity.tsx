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

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "quantity";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Quantity";

        const placeholder = "Please enter your quantity";

        const rules = [
            {
                required: true,
                message: 'Please enter your quantity',
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
            />
        );
    }
}