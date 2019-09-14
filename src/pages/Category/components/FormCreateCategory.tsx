import React from 'react';

import {Button, Col, Form, Row} from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

import {Category} from '../../../store/category/static/types';
import {createMulti} from '../../../store/category/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';

interface OwnProps {
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {
    createMulti: typeof createMulti
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    categories: any,
    loading: boolean,
    disabledButton: boolean,
}

let categoryNumber: number = 1;

class CreateCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            categories: [],
            loading: false,
            disabledButton: false
        };
    }

    componentWillReceiveProps(newProps: any) {
        console.log('new props', newProps);
        this.setState({
            categories: newProps.categories,
        });
    }

    getFields(keys: any) {
        const { form } = this.props;
        let buttonRemove: any = null;

        const childrens = keys.map((k: any, value: any) => {
            if (k > 0) {
                buttonRemove = (
                    <Col span={2}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemove(k)}>X</Button>
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
        this.setState({
            loading: false,
            disabledButton: false
        });
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const { categories } = this.state;

        let maxKey = 0;
        if (categories.length) {
            maxKey = Math.max.apply(Math, categories.map((category: any, index: any) => {
                return category.key;
            }));
        }

        this.props.form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }
            this.setState({
                loading: true,
                disabledButton: true
            });

            setTimeout(() => {
                const { keys, categoryName, categoryCode, categoryNote } = values;
                const newCategories = keys.map((value: any, index: any) => {
                    maxKey++;
                    return {
                        key: maxKey,
                        code: categoryCode[value],
                        name: categoryName[value],
                        note: categoryNote[value],
                    };
                });
    
                this.props.createMulti(newCategories);
    
                this.handleReset();

            }, LOADING_TIMEOUT);
        });
        
        
    };

    handleAddMore = () => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(categoryNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleRemove = (i: any) => {
        const { form } = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== i),
        });


    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const { loading, disabledButton } = this.state;
        return (
            <div id="create-category">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit} >
                    <h1>Create Form</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Submit
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset} disabled={disabledButton}>
                                Reset
                            </Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleAddMore} disabled={disabledButton}>
                                Add More
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    categories: state.staticCategories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMulti: (categories: Category[]) => dispatch(createMulti(categories)),
});

const CreateCategoryForm = Form.create({ name: 'create_category_form' })(CreateCategory);

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryForm);
