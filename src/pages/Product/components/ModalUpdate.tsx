import React from 'react';

import { Modal, Form } from 'antd';

import ProductCodeInput from './InputCode';
import ProductNameInput from './InputName';
import ProductNoteTextArea from './TextAreaNote';
import SelectCategory from './SelectCategory';
import SelectGroup from './SelectGroup';
import SelectClass from './SelectClass';

import { Product } from '../../../store/product/static/types';
import { update } from '../../../store/product/static/actions';

// import { executeGet, update as updateDynamic } from '../../../store/product/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { FormComponentProps } from 'antd/es/form';

import { LOADING_TIMEOUT } from '../../../constants';

import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    productKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    categories: any,
    groups: any,
    classes: any,
}

interface StateProps {
    products: Product[]
}

interface DispatchProps {
    update: typeof update,
    // updateDynamic: typeof updateDynamic,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    findProduct: any,
    confirmLoading: boolean
}

class ModalUpdateProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            findProduct: null,
            confirmLoading: false
        }
    }

    async componentWillReceiveProps(newProps: any) {
        const { products } = this.props;
        const { productKey, isDynamic } = newProps;

        if (!productKey) {
            return;
        }

        let findProduct;
        if (!isDynamic) {
            findProduct = findElementInArrayObjectByAttribute(products, 'key', productKey);
        }
        else {
            // findProduct = await executeGet(productKey);
        }

        this.setState({
            findProduct
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
        const { form, categories, groups, classes } = this.props;
        const { findProduct } = this.state;

        const key = null;

        let code = null;
        let name = null;
        let note = null;
        let categoryId = null;
        let groupId = null;
        let classId = null;
        if (findProduct) {
            code = findProduct.code;
            name = findProduct.name;
            note = findProduct.note;
            categoryId = findProduct.categoryId;
            groupId = findProduct.groupId;
            classId = findProduct.classId;
        }

        return (
            <div>
                <ProductCodeInput form={form} k={key} loadValue={code} />
                <ProductNameInput form={form} k={key} loadValue={name} />
                <ProductNoteTextArea form={form} k={key} loadValue={note} />
                <SelectCategory form={form} k={key} values={categories} loadValue={categoryId} />
                <SelectGroup form={form} k={key} values={groups} loadValue={groupId} />
                <SelectClass form={form} k={key} values={classes} loadValue={classId} />
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
                const { productName, productCode, productNote, productCategory, productGroup, productClass } = values;
                const { productKey } = this.props;

                const product = {
                    key: productKey,
                    name: productName,
                    code: productCode,
                    note: productNote,
                    categoryId: productCategory,
                    groupId: productGroup,
                    classId: productClass,
                };

                if (!isDynamic) {
                    await this.props.update(productKey, product);
                }
                else {
                    // await this.props.updateDynamic(productKey, product);
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
                title="Update a product"
                okText="Submit"
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
    products: state.staticProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    update: (productKey: number | string, product: any) => dispatch(update(productKey, product)),
    // updateDynamic: (productKey: number | string, product: any) => dispatch(updateDynamic(productKey, product)),
});

const FormInModal = Form.create<IProps>({ name: 'modal-update' })(ModalUpdateProduct);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormInModal);