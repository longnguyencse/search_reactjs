import React from 'react';

import { Input, Form } from 'antd';

import { returnDefaultString, returnDefaultArary } from '../../helpers';

const { TextArea } = Input;

interface OwnProps {
    form: any,
    elementId: any,
    label?: string,
    placeholder?: string,
    rules?: any,
    initialValue?: string
}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

export default class CustomTextArea extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { form, label, elementId, placeholder, rules, initialValue } = this.props;
        const { getFieldDecorator } = form;

        const loadLabel = returnDefaultString(label);
        const loadElementId = returnDefaultString(elementId);
        const loadRules = returnDefaultArary(rules);
        const loadPlaceholder = returnDefaultString(placeholder);
        const loadInitialValue = returnDefaultString(initialValue);

        return (
            <Form.Item label={loadLabel}>
                {getFieldDecorator({ loadElementId }, {
                    initialValue: loadInitialValue,
                    rules: { loadRules },
                })(<TextArea placeholder={loadPlaceholder} />)}
            </Form.Item>
        );
    }
}