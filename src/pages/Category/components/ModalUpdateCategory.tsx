import React from 'react';

import { Button, Modal, Form, Input } from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

import { Category } from '../../../store/category/types';
import { Category as StaticCategory } from '../../../store/category/static/types';
import { createMulti } from '../../../store/category/static/actions';
import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { FormComponentProps } from 'antd/es/form';


interface OwnProps {
    categoryKey: number | string,
    visible: boolean,
    onCancel: () => void,
    // onCreate?: () => void
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {

}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    findCategory: any
}

class ModalUpdateCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            findCategory: null
        }
    }

    componentWillReceiveProps(newProps: any) {
        console.log("newProps", newProps);
        const { categories } = this.props;
        const { categoryKey } = newProps;

        if (!categoryKey) {
            return;
        }

        const findCategory = categories.find((category: any) => {
            return category.key === categoryKey;
        });

        this.setState({
            findCategory
        });
    }

    closeModal = () => {
        this.props.form.resetFields();
        this.props.onCancel();
    }

    getFields = () => {
        const { form } = this.props;
        const { findCategory } = this.state;

        const key = null;

        let code = null;
        let name = null;
        let note = null;
        if (findCategory) {
            code = findCategory.code;
            name = findCategory.name;
            note = findCategory.note;
        }

        return (
            <div>
                <CategoryCodeInput form={form} k={key} loadValue={code}/>
                <CategoryNameInput form={form} k={key} loadValue={name}/>
                <CategoryNoteTextArea form={form} k={key} loadValue={note}/>
            </div>
        );
    }

    handleSubmit = () => {
        const { form } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            // this.setState({ visible: false });
        });
    }

    render() {
        const { form, visible, onCancel } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Update a category"
                okText="Submit"
                onCancel={() => this.closeModal()}
                onOk={() => this.handleSubmit()}
            >
                <Form layout="vertical">
                    {this.getFields()}
                </Form>
            </Modal>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    categories: state.staticCategories,
});

const FormInModal = Form.create<IProps>({ name: 'modal-update' })(ModalUpdateCategory);

export default connect(
    mapStateToProps
)(FormInModal);

// export default Form.create<IProps>({ name: 'modal-update' })(ModalUpdateCategory);