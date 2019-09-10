import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

interface OwnProps {
    form: any,
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

export default class SelectCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "productCategory";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Product Category";

        const placeholder = "Please select your product category";

        const rules = [
            {
                required: true,
                message: 'Please select your product category',
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
            />
        );
    }
}