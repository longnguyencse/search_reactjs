import React from 'react';

import CustomInput from '../../../components/CustomForm/Input';

interface OwnProps {
    form?: any,
    k?: any
    loadValue?: any,
}

interface DispatchProps {

}

interface StateProps {

}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    
}

export default class CategoryNameInput extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
    }

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "categoryName";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Category Name";

        const placeholder = "Please enter your category name";

        const rules = [
            {
                required: true,
                message: 'Please enter your category name',
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
            />
        );
    }
}