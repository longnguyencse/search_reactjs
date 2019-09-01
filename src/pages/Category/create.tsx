import React from 'react';

import {Button, Col, Form, Row, Table} from 'antd';

import CategoryCodeInput from './components/CategoryCodeInput';
import CategoryNameInput from './components/CategoryNameInput';
import CategoryNoteTextArea from './components/CategoryNoteTextArea';

import {Category} from '../../store/category/types';
import {createMultiCategory} from '../../store/category/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
    form?: any
}

interface StateProps {
    categories: {}
}

interface DispatchProps {
    createMultiCategory: typeof createMultiCategory,
}

type ICreateCategoryProps = OwnProps & StateProps & DispatchProps;

interface ICreateCategoryState {
    categoryNumber: number,
    categories: any,
    categoryKey: number,
}

let categoryNumber:number = 1;

const columns = [
    {
        title: "Category Name",
        dataIndex: "name",
    },
    {
        title: "Category Code",
        dataIndex: "code",
    },
    {
        title: "Category Note",
        dataIndex: "note",
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (text:any, row:any, index:any) => {
            return <a href={row.key}>Update</a>;
        },
    },

];

class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {
    constructor(props: ICreateCategoryProps) {
        super(props);

        this.state = {
            categoryNumber: 1,
            categories: null,
            categoryKey: 0,
        };
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
        let {categoryKey} = this.state;
        this.props.form.validateFields(async (err: any, values: any) => {
            if(err){
                return;
            }
            const {keys, categoryName, categoryCode, categoryNote}= values;
            const categories = keys.map((value:any, index:any) => {
                categoryKey++;
                return {
                    key: categoryKey,
                    code:  categoryCode[value], 
                    name: categoryName[value],
                    note: categoryNote[value],
                };
            });

            await this.props.createMultiCategory(categories);
            this.setState({
                categories: this.props.categories
            });
            this.handleReset();

            this.setState({categoryKey});
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
        return (
            <div id="create-category">
                <Form className="ant-advanced-search-form" onSubmit={this.handleSubmit}>
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
                <div className="search-result-categories">
                    { categories ?
                        <Table pagination={false} columns={columns} dataSource={categories} rowKey="key"/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

const CreateCategoryForm = Form.create({ name: 'create_category_form' })(CreateCategory);

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    categories: state.categories.createMultiCategory,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMultiCategory: (categories) => dispatch(createMultiCategory(categories)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateCategoryForm);
