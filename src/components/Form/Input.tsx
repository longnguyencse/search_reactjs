import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface OwnProps {
    form?: any,
    k?: number,
    labelName?: string,
    idName?: string,
    placeholder?: string,
    rules?: any
}

interface DispatchProps {

}

interface StateProps {

}

type InputProps = OwnProps & DispatchProps & StateProps;

interface InputState {
    
}

export default class productCodeInput extends React.Component<InputProps, InputState> {

    constructor(props: InputProps){
        super(props);
    }

    render(){
        const { form, k, labelName, idName, placeholder, rules } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={labelName}>
                {getFieldDecorator({idName}, {
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input placeholder={placeholder} />)}
            </Form.Item>
        );
    }
}