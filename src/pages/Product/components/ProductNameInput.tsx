import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface IProductNameInputProps {
    form?: any,
    k: number
}

interface IProductNameInputState {
    
}

export default class ProductNameInput extends React.Component<IProductNameInputProps, IProductNameInputState> {

    constructor(props: IProductNameInputProps){
        super(props);
    }

    render(){
        const { form, k } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={`Product Name`}>
                {getFieldDecorator(`field-productName-${k}`, {
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input placeholder="Please enter your product name" />)}
            </Form.Item>
        );
    }
}