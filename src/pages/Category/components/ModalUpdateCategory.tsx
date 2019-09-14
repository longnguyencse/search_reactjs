import React from 'react';

import {Form, Modal} from 'antd';

import CategoryCodeInput from './CategoryCodeInput';
import CategoryNameInput from './CategoryNameInput';
import CategoryNoteTextArea from './CategoryNoteTextArea';

import { Category } from '../../../store/category/static/types';
import { update } from '../../../store/category/static/actions';

import { executeGet, update as updateDynamic } from '../../../store/category/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';

import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    categoryKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {
    update: typeof update,
    updateDynamic: typeof updateDynamic,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    findCategory: any,
    confirmLoading: boolean
}

class ModalUpdateCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            findCategory: null,
            confirmLoading: false
        }
    }

    async componentWillReceiveProps(newProps: any) {
        const { categories } = this.props;
        const { categoryKey, isDynamic } = newProps;

        if (!categoryKey) {
            return;
        }

        let findCategory;
        if(!isDynamic){
            findCategory = findElementInArrayObjectByAttribute(categories, 'key', categoryKey);
        }
        else {
            findCategory = await executeGet(categoryKey);
        }

        this.setState({
            findCategory
        });
    }

    closeModal = () => {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({
            confirmLoading: false,
        });
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
                <CategoryCodeInput form={form} k={key} loadValue={code} />
                <CategoryNameInput form={form} k={key} loadValue={name} />
                <CategoryNoteTextArea form={form} k={key} loadValue={note} />
            </div>
        );
    }

    handleSubmit = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            const { form, isDynamic } = this.props;
            form.validateFields(async (err, values) => {
                if (err) {
                    return;
                }
                const { categoryName, categoryCode, categoryNote } = values;
                const { categoryKey } = this.props;
                const category = {
                    key: categoryKey,
                    name: categoryName,
                    code: categoryCode,
                    note: categoryNote
                };

                if(!isDynamic){
                    await this.props.update(categoryKey, category);
                }
                else {
                    await this.props.updateDynamic(categoryKey, category);
                }
                this.closeModal();
            });

        }, LOADING_TIMEOUT);

    }

    render() {
        const { visible } = this.props;
        const { confirmLoading } = this.state;
        return (
            <Modal
                visible={visible}
                title="Cập nhật loại hàng"
                okText="Đồng ý"
                cancelText = "Hủy bỏ"
                onCancel={() => this.closeModal()}
                onOk={() => this.handleSubmit()}
                confirmLoading={confirmLoading}
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

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    update: (categoryKey: number | string, category: any) => dispatch(update(categoryKey, category)),
    updateDynamic: (categoryKey: number | string, category: any) => dispatch(updateDynamic(categoryKey, category)),
});

const FormInModal = Form.create<IProps>({ name: 'modal-update' })(ModalUpdateCategory);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormInModal);
