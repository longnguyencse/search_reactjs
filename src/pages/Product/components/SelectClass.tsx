import React from 'react';

import CustomSelect from '../../../components/CustomForm/Select';

interface OwnProps {
    form: any,
    k?: any
    loadValue?: any,
    values?: any
}

interface DispatchProps {
}

interface StateProps {
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
}

export default class SelectClass extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(){
    }

    render(){
        const { form, k, loadValue, values } = this.props;

        let elementId = "productClass";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Ngành hàng";

        const placeholder = "Vui lòng lựa chọn ngành hàng";

        const rules = [
            {
                required: true,
                message: 'Vui lòng lựa chọn ngành hàng',
            },
        ];

        let initialValue = "";
        if(loadValue){
            initialValue = this.props.loadValue;
        }

        return (
            <CustomSelect 
                form={form}

                elementId={elementId}

                label={label}

                placeholder={placeholder}

                rules = {rules}

                initialValue={initialValue}

                values={values}
            />
        );
    }
}