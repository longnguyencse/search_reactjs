import React from 'react';

import { Select, Input, Form } from 'antd';

const { Option } = Select;

interface OwnProps {
    form?: any,
    k?: any
    loadValue?: any
}

interface DispatchProps {

}

interface StateProps {

}

type ICategoryCodeInputProps = OwnProps & DispatchProps & StateProps;

interface ICategoryCodeInputState {
    loadValue: any
}

export default class CategoryCodeInput extends React.Component<ICategoryCodeInputProps, ICategoryCodeInputState> {

    constructor(props: ICategoryCodeInputProps){
        super(props);

        this.state = {
            loadValue: ""
        }
    }

    componentWillReceiveProps(newProps: any){
        const loadValue = newProps.loadValue ? newProps.loadValue : null;

        console.log("componentWillReceiveProps-inputCode", newProps, loadValue);

        this.setState({
            loadValue
        });
    }

    render(){
        const { form } = this.props;
        const { getFieldDecorator } = form;

        let elementName = "categoryCode";
        if(this.props.k !== null){
            elementName = elementName + `[${this.props.k}]`;
        }

        console.log("render-bcm", this.state.loadValue)


        // let loadValue = "";
        // if(this.props.loadValue){
        //     loadValue = this.props.loadValue;
        // }
        
        return (
            <Form.Item label={`Category Code`}>
                {getFieldDecorator(elementName, {
                    initialValue: this.state.loadValue,
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