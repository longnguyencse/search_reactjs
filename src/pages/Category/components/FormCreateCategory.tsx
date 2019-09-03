import React from 'react';

import {Button, Col, Form, Row, Table} from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

import LocalStorage from '../../../services/LocalStorage';

interface OwnProps {
    form?: any,
    setCategories?: (categories:any) => void
    xxx: number,
}

interface StateProps {
}

interface DispatchProps {
}

type ICreateCategoryProps = OwnProps & StateProps & DispatchProps;

interface ICreateCategoryState {
    categories: any,
}

let categoryNumber:number = 1;

class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {
    constructor(props: ICreateCategoryProps) {
        super(props);

        this.state = {
            categories: null,
        };

        console.log(props)
    }

    getFields(keys:any) {
        const { form } = this.props;
        let buttonRemove:any = null;

        const childrens = keys.map((k: any, value: any) => {
            if(k > 0){
                buttonRemove = (
                    <Col span={2}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemoveProduct(k)}>X</Button>
                        </Form.Item>
                    </Col>
                );
            }

            return (
                <div key={k}>
                    <Col span={7}>
                        <CategoryCodeInput form={form} k={k} />
                    </Col>
                    <Col span={7}>
                        <CategoryNameInput form={form} k={k} />
                    </Col>
                    <Col span={8}>
                        <CategoryNoteTextArea form={form} k={k} />
                    </Col>
                    {buttonRemove}
                </div>
            )
        });

        return childrens;
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        const {categories} = this.state;
        let maxKey = 0;
        if(categories){
            maxKey = Math.max.apply(Math, categories.map((category: any, index: any) =>  { 
                return category.key;  
            }));
        }
        
        this.props.form.validateFields(async (err: any, values: any) => {
            if(err){
                return;
            }
            const {keys, categoryName, categoryCode, categoryNote}= values;
            const newCategories = keys.map((value:any, index:any) => {
                maxKey++;
                return {
                    key:  maxKey,
                    code: categoryCode[value], 
                    name: categoryName[value],
                    note: categoryNote[value],
                };
            });

            let mergeCategories;
            if(!categories){
                mergeCategories = newCategories;
            }
            else {
                mergeCategories = newCategories.concat(categories);
            }

            const localS = new LocalStorage();

            await localS.setValue('categories', mergeCategories);

            this.setState({
                categories: mergeCategories,
            });

            // this.props.setCategories(categories);

            this.handleReset();
        });
    };

    handleAddMore = () => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(categoryNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleRemoveProduct = (i:any) => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key:any) => key !== i),
        });


    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const {categories} = this.state;
        console.log('render', categories);
        return (
            <div id="create-category">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit}>
                    <h1>Create Form</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                Reset
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleAddMore}>
                                Add More
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const CreateCategoryForm = Form.create({ name: 'create_category_form' })(CreateCategory);

export default CreateCategoryForm;
