import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface OwnProps {
    form?: any,
    k?: any
    loadValue?: any,
}

interface DispatchProps {

}

interface StateProps {

}

type ICategoryNameInputProps = OwnProps & DispatchProps & StateProps;

interface ICategoryNameInputState {
    
}

export default class CategoryNameInput extends React.Component<ICategoryNameInputProps, ICategoryNameInputState> {

    constructor(props: ICategoryNameInputProps){
        super(props);
    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;
        
        let elementName = "categoryName";
        if(this.props.k !== null){
            elementName = elementName + `[${this.props.k}]`;
        }

        let loadValue = "";
        if(this.props.loadValue){
            loadValue = this.props.loadValue;
        }

        return (
            <Form.Item label={`Category Name`}>
                {getFieldDecorator(elementName, {
                    initialValue: loadValue,
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input placeholder="Please enter your category name" />)}
            </Form.Item>
        );
    }
}