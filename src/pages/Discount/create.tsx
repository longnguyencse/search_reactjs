import React from 'react';
import {Divider, Icon, Select} from 'antd';

const {Option} = Select;

interface IDiscountFormProps {

}

interface IDiscountFormStates {

}

class CreateDiscount extends React.Component<IDiscountFormProps, IDiscountFormStates> {
    constructor(props: IDiscountFormProps) {
        super(props);
    }

    render() {
        return (
            <Select
                defaultValue="1"
                style={{width: 120}}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{margin: '4px 0'}}/>
                        <div style={{padding: '8px', cursor: 'pointer'}}>
                            <Icon type="plus"/> Add item
                        </div>
                    </div>
                )}
            >
                <Option value="1">Mua A tặng A</Option>
                <Option value="2">Mua A Chiết khấu X</Option>
            </Select>
        );
    }
}

export default CreateDiscount;
