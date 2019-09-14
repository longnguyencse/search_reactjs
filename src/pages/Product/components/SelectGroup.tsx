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

export default class SelectGroup extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    componentDidMount(){
        console.log("Select dimout")
    }

    render(){
        const { form, k, loadValue, values } = this.props;

        let elementId = "productGroup";
        if(k !== null){
            elementId = elementId + `[${this.props.k}]`;
        }

        const label = "Nhóm hàng";

        const placeholder = "Vui lòng lựa chọn nhóm hàng";

        const rules = [
            {
                required: true,
                message: 'Vui lòng lựa chọn nhóm hàng',
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