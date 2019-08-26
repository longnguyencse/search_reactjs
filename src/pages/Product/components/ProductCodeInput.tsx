import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface IProductCodeInputProps {
    form?: any,
    k: number
}

interface IProductCodeInputState {
    
}

export default class productCodeInput extends React.Component<IProductCodeInputProps, IProductCodeInputState> {

    constructor(props: IProductCodeInputProps){
        super(props);
    }

    render(){
        const { form, k } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={`Product Code`}>
                {getFieldDecorator(`productCode[${k}]`, {
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input placeholder="Please enter your product code" />)}
            </Form.Item>
        );
    }
}