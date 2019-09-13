import React from 'react';
import CustomInput from '../../../components/CustomForm/Input';

interface OwnProps {
    form?: any,
    k?: any
    loadValue?: any
}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

class EmailInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render() {
        const {form, k, loadValue} = this.props;
        let elementId = 'email';
        if (null !== k) {
            elementId = elementId + `[${this.props.k}]`;
        }
        const label = "Email";
        const placeholder = "Please enter your email address";

        const rules = [
            {
                required: true,
                message: 'Please enter your email address',
            },
        ];

        let initialValue = "";
        if (loadValue) {
            initialValue = this.props.loadValue;
        }

        return (
            <CustomInput
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules={rules}

                initialValue={initialValue}
            />
        );
    }
}

export default EmailInput;
