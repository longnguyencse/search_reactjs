import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface OwnProps {
    form?: any,
    k?: any,
    loadValue?: any,

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
        const { form } = this.props;
        const { getFieldDecorator } = form;
        
        let elementName = "categoryNote";
        if(this.props.k !== null){
            elementName = elementName + `[${this.props.k}]`;
        }

        let loadValue = "";
        if(this.props.loadValue){
            loadValue = this.props.loadValue;
        }

        return (
            <Form.Item label={`Category Note`}>
                {getFieldDecorator(elementName, {
                    initialValue: loadValue,
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