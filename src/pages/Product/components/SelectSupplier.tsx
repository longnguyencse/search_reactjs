import React from 'react';

import { Select, Input } from 'antd';

const { Option } = Select;

interface ISelectSupplierProps {

}

interface ISelectSupplierState {
    
}

export default class SelectSupplier extends React.Component<ISelectSupplierProps, ISelectSupplierState> {

    constructor(props: ISelectSupplierProps){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onChange(value: any) {
        console.log(`selected ${value}`);
      }
      
    onBlur() {
        console.log('blur');
      }
      
    onFocus() {
        console.log('focus');
      }
      
    onSearch(val: any) {
        console.log('search:', val);
      }

    render(){
        return <Input placeholder="Hhihi" />;
        return (
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
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
            </Select>
        );
    }
}