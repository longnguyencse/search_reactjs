import React from 'react';

import {Button, Col, Form, Row} from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

import LocalStorage from '../../../services/LocalStorage';
import { FormComponentProps } from 'antd/es/form';

interface OwnProps extends FormComponentProps{
    saveCategory: (categories: any, hideUpdateForm: boolean) => void,
    setHideUpdateForm: (hideUpdateForm: boolean) => void,
    categories?: any,
    categoryKey?: any,
    hideUpdateForm?: boolean
}

interface StateProps {
}

interface DispatchProps {
}

type IUpdateCategoryProps = OwnProps & StateProps & DispatchProps;

interface IUpdateCategoryState {
    categories: any,
    categoryKey: number | null,
    findCategory: any,
}

class UpdateCategory extends React.Component<IUpdateCategoryProps, IUpdateCategoryState> {
    constructor(props: IUpdateCategoryProps) {
        super(props);

        this.state = {
            categories: null,
            categoryKey: null,
            findCategory: null
        };

        console.log(props)
    }

    componentWillReceiveProps(newProps: any){
        const categories = newProps.categories ? newProps.categories : [];
        const categoryKey = newProps.categoryKey ? newProps.categoryKey : null;

        if(!categoryKey){
            return;
        }

        const findCategory = categories.find((category: any) => {
            return category.key === newProps.categoryKey;
        });

        this.setState({
            categories,
            categoryKey,
            findCategory
        });
    }

    getFields(findCategory: any) {
        const { form } = this.props;
        // const key = this.props.categoryKey;
        const key = null;

        let code = null;
        let name = null;
        let note = null;
        if(findCategory){
            code = findCategory.code;
            name = findCategory.name;
            note = findCategory.note;
        }

        return (
            <div>
                <Col span={7}>
                    <CategoryCodeInput form={form} k={key} loadValue={code} />
                </Col>
                <Col span={7}>
                    <CategoryNameInput form={form} k={key} loadValue={name}/>
                </Col>
                <Col span={8}>
                    <CategoryNoteTextArea form={form} k={key} loadValue={note}/>
                </Col>
            </div>
        )
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleCancel = () => {
        this.props.setHideUpdateForm(true);

        this.handleReset();
    }

    handleSubmit = async (e: any) => {
        e.preventDefault();

        const {categories} = this.state;
        const localS = new LocalStorage();

        this.props.form.validateFields(async (err: any, values: any) => {
            if(err){
                return;
            }

            const {categoryName, categoryCode, categoryNote}= values;
            
            const category = {
                key: this.props.categoryKey,
                name: categoryName,
                code: categoryCode,
                note: categoryNote
            };
            
            const foundIndex = categories.findIndex((category: any) => category.key === this.props.categoryKey);
            categories[foundIndex] = category;
            
            await localS.setValue('categories', categories);

            this.props.saveCategory(categories, true);

            this.handleReset();

        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        // getFieldDecorator('keys', { initialValue: [0] });
        // const keys = getFieldValue('keys');
        const {findCategory} = this.state;
        return (
            <div id="update-category">
                <Form className="ant-advanced-update-form" onSubmit={this.handleSubmit} style={{display: this.props.hideUpdateForm ? "none" : "block"}}>
                    <h1>Update Form</h1>
                    <Row gutter={24}>{this.getFields(findCategory)}</Row>
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
