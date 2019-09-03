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

type ICategoryCodeTextAreaProps = OwnProps & DispatchProps & StateProps;

interface ICategoryCodeTextAreaState {
    
}

export default class CategoryCodeTextArea extends React.Component<ICategoryCodeTextAreaProps, ICategoryCodeTextAreaState> {

    constructor(props: ICategoryCodeTextAreaProps){
        super(props);
    }

    render(){
        const { form, k } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={`Category Note`}>
                {getFieldDecorator(`categoryNote[${k}]`, {
                    rules: [
                        {
                            required: true,
                            message: 'Input something!',
                        },
                    ],
                })(<Input.TextArea placeholder="Please enter your category note" />)}
            </Form.Item>
        );
    }
}