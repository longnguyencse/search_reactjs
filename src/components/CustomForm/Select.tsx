import React from 'react';

import { Form, Select } from 'antd';

import {returnDefaultString, returnDefaultArary} from '../../helpers';

const { Option } = Select;

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

export default class CustomSelect extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    onChange = (value: any) => {
        console.log(`selected ${value}`);
    }

    onBlur = () => {
        console.log('blur');
    }

    onFocus = () => {
        console.log('focus');
    }

    onSearch = (val: any) => {
        console.log('search:', val);
    }


    render() {
        const { form, label, elementId, placeholder, rules, initialValue  } = this.props;
        const { getFieldDecorator } = form;

        const loadLabel = returnDefaultString(label);
        const loadElementId = returnDefaultString(elementId);
        const loadRules = returnDefaultArary(rules);
        const loadPlaceholder = returnDefaultString(placeholder);
        const loadInitialValue = returnDefaultString(initialValue);

        const formOptions: any = {
            rules: loadRules
        };

        if(loadInitialValue){
            formOptions.initialValue = loadInitialValue;
        }
        
        return (
            <Form.Item label={loadLabel}>
                {getFieldDecorator(loadElementId, formOptions)(<Select
                    showSearch
                    placeholder={loadPlaceholder}
                    // optionFilterProp="children"
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    onSearch={this.onSearch}
                    filterOption={(input: any, option: any) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>)}
            </Form.Item>
        );
    }
}