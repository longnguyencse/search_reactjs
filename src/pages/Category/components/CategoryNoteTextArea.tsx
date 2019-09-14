import React from 'react';

import CustomTextArea from '../../../components/CustomForm/TextArea';


interface OwnProps {
    form?: any,
    k?: any,
    loadValue?: any,

}

interface DispatchProps {

}

interface StateProps {

}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    
}

export default class CategoryCodeTextArea extends React.Component<IProps, IState> {

    constructor(props: IProps){
        super(props);
    }

    render(){
        const { form, k, loadValue } = this.props;

        let elementId = "categoryNote";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Ghi Chú";

        const placeholder = "Vui lòng ghi chú cho loại hàng";

        const rules = [
            {
                required: true,
                message: 'Vui lòng ghi chú cho loại hàng',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
        }

        return (
            <CustomTextArea 
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
