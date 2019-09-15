import React from 'react';

import CustomInput from '../../../components/CustomForm/Input';

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

export default class InputDiscount extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
    }

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "discount";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Chiết khấu";

        const placeholder = "Vui lòng nhập chiết khấu";

        const rules = [
            {
                required: false,
                message: 'Vui lòng nhập chiết khấu',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
        }

        return (
            <CustomInput 
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules = {rules}

                initialValue={initialValue}

                disabled={true}
            />
        );
    }
}
