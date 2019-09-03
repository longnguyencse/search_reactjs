import React from 'react';

import {Button, Col, Form, Row} from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

// import LocalStorage from '../../../services/LocalStorage';
import { FormComponentProps } from 'antd/es/form';

interface OwnProps extends FormComponentProps{
    setHideUpdateForm: (hideUpdateForm: boolean) => void,
    hideUpdateForm?: boolean
}

interface StateProps {
}

interface DispatchProps {
}

type IUpdateCategoryProps = OwnProps & StateProps & DispatchProps;

interface IUpdateCategoryState {
    categories: any,
}

let categoryNumber:number = 1;

class UpdateCategory extends React.Component<IUpdateCategoryProps, IUpdateCategoryState> {
    constructor(props: IUpdateCategoryProps) {
        super(props);

        this.state = {
            categories: null,
        };

        console.log(props)
    }

    getFields(keys:any) {
        const { form } = this.props;

        return (
            <div>
                <Col span={7}>
                    <CategoryCodeInput form={form} />
                </Col>
                <Col span={7}>
                    <CategoryNameInput form={form} />
                </Col>
                <Col span={8}>
                    <CategoryNoteTextArea form={form} />
                </Col>
            </div>
        )
    }

    handleCancel = () => {
        this.props.setHideUpdateForm(true);
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();

        this.props.form.validateFields(async (err: any, values: any) => {
            if(err){
                return;
            }
            const {keys, categoryName, categoryCode, categoryNote}= values;

            // this.props.setHideUpdateForm(true);

            // this.handleReset();
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const {categories} = this.state;
        console.log('render', categories);
        return (
            <div id="update-category">
                <Form className="ant-advanced-update-form" onSubmit={this.handleSubmit} style={{display: this.props.hideUpdateForm ? "none" : "block"}}>
                    <h1>Update Form</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const UpdateCategoryForm = Form.create<IUpdateCategoryProps>({ name: 'update_category_form' })(UpdateCategory);

export default UpdateCategoryForm;
