import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface OwnProps {
    form?: any,
    k?: number
}

interface DispatchProps {

}

interface StateProps {

}

type ICategoryCodeInputProps = OwnProps & DispatchProps & StateProps;

interface ICategoryCodeInputState {
    
}

export default class CategoryCodeInput extends React.Component<ICategoryCodeInputProps, ICategoryCodeInputState> {

    constructor(props: ICategoryCodeInputProps){
        super(props);
    }

    render(){
        const { form, k } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={`Category Code`}>
                {getFieldDecorator(`categoryCode[${k}]`, {
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input placeholder="Please enter your category code" />)}
            </Form.Item>
        );
    }
}