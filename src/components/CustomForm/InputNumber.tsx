import React from 'react';

import {Form, InputNumber} from 'antd';

import {returnDefaultArary, returnDefaultString} from '../../helpers';

interface OwnProps {
    form: any,
    elementId: any,
    minValue: number,
    label?: string,
    placeholder?: string,
    rules?: any,
    initialValue?: string,
    onChange?: (selectValue: number | string) => void,

}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

export default class CustomInputNumber extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    onChange = (value: any) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        console.log("Input Number was changed");
    };

    render() {
        const { form, label, elementId, placeholder, rules, initialValue, minValue } = this.props;
        const { getFieldDecorator } = form;

        const loadLabel = returnDefaultString(label);
        const loadElementId = returnDefaultString(elementId);
        const loadRules = returnDefaultArary(rules);
        const loadPlaceholder = returnDefaultString(placeholder);
        const loadInitialValue = returnDefaultString(initialValue);


        return (
            <Form.Item label={loadLabel}>
                {getFieldDecorator(loadElementId, {
                    initialValue: loadInitialValue,
                    rules: loadRules,
                })(<InputNumber
                    placeholder={loadPlaceholder}

                    onChange={this.onChange}

                    min={minValue}
                />)}
            </Form.Item>
        );
    }
}
