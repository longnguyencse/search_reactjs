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

type ICategoryNameInputProps = OwnProps & DispatchProps & StateProps;

interface ICategoryNameInputState {
    
}

export default class CategoryNameInput extends React.Component<ICategoryNameInputProps, ICategoryNameInputState> {

    constructor(props: ICategoryNameInputProps){
        super(props);
    }

    render(){
        const { form, k } = this.props;
        const { getFieldDecorator } = form;
        
        return (
            <Form.Item label={`Category Name`}>
                {getFieldDecorator(`categoryName[${k}]`, {
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