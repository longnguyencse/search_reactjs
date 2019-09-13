import React from 'react';

import {Col, Form, Input} from 'antd';
import FormCreate from "./component/FormCreate";

interface ICreateSupplierProps {
    form?: any,
}

interface ICreateSupplierState {
    expand: boolean,
    numView: Array<any>
}

class CreateSupplier extends React.Component <ICreateSupplierProps, ICreateSupplierState> {
    constructor(props: ICreateSupplierProps) {
        super(props);

        this.state = {
            expand: false,
            numView: this.getFields()
        };

        this.handleReset = this.handleReset.bind(this);
        this.handSubmit = this.handSubmit.bind(this);
    }

    getFields() {
        const {getFieldDecorator} = this.props.form;
        const children = [];
        const propertiesOfSupplier = ['Tên NCC', 'Mã NCC'];
        for (let i = 0; i < propertiesOfSupplier.length; i++) {
            const label = propertiesOfSupplier[i];
            children.push(
                <Col span={8} key={i}>
                    <Form.Item label={label}>
                        {getFieldDecorator(label, {
                            rules: [
                                {
                                    required: true,
                                    message: 'Input something!',
                                },
                            ],
                        })(<Input placeholder={label}/>)}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    handleReset() {
        this.props.form.resetFields();
    }

    handSubmit = (e: any) => {
        e.preventDefault();
        this.props.form.validateFields((err: any, values: any) => {
            console.log('Received values of form: ', values);
        });
    };

    add = (e: any) => {
        console.log('add');
    };

    render() {
        // const {expand} = this.state;
        return (
            <div id="create-supplier">
                <FormCreate/>
            </div>
        );
    }
}

const CreateSupplierForm = Form.create({name: 'create_supplier_form'})(CreateSupplier);

export default CreateSupplierForm;
