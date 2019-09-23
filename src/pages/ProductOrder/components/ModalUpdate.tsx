import React from 'react';

import { Modal, Form } from 'antd';

import SelectSupplier from './SelectSupplier';
import SelectProduct from './SelectProduct';
import InputQuantity from './InputQuantity';
import InputPrice from './InputPrice';
import InputMoney from './InputMoney';
import InputDiscount from './InputDiscount';

// import { Product } from '../../../store/product/static/types';
import { update } from '../../../store/order/static/actions';

// import { executeGet, update as updateDynamic } from '../../../store/product/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import { FormComponentProps } from 'antd/es/form';

import { LOADING_TIMEOUT } from '../../../constants';

import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    productId: number | string,
    visible: boolean,
    products: any,
    onCancel: () => void,
    isDynamic?: boolean,
    order: any,
    // categories: any,
    // groups: any,
    // classes: any,
}

interface StateProps {
    // products: Product[]
}

interface DispatchProps {
    // update: typeof update,
    // updateDynamic: typeof updateDynamic,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    findItem: any,
    confirmLoading: boolean
}

class ModalUpdateProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            findItem: null,
            confirmLoading: false
        }
    }

    async componentWillReceiveProps(newProps: any) {
        const { products, order } = this.props;
        const { productId, isDynamic } = newProps;

        if (!productId) {
            return;
        }

        let findItem;
        if(!isDynamic){
            findItem = findElementInArrayObjectByAttribute(order.items, 'productId', productId);
        }
        else {
            findItem = {};
        }

        this.setState({
            findItem
        });
        // let findProduct: { categoryId: any; category: { id: any; }; groupId: any; group: { id: any; }; classId: any; productClass: { id: any; }; };
        // if (!isDynamic) {
        //     findProduct = findElementInArrayObjectByAttribute(products, 'key', productId);
        // }
        // else {
        //     findProduct = await executeGet(productId);
        //     if(findProduct){
        //         findProduct.categoryId = findProduct.category.id;
        //         findProduct.groupId = findProduct.group.id;
        //         findProduct.classId = findProduct.productClass.id;
        //     }
        // }

        // this.setState({
        //     findProduct
        // });
    }

    closeModal = () => {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({
            confirmLoading: false,
        });
    }

    getFields = () => {
        const { form, products } = this.props;
        const { findItem } = this.state;

        // const key = null;

        let productId = null;
        let quantity = null;
        let price = null;
        let money = null;
        let discount = null;
        if (findItem) {
            productId = findItem.productId;
            quantity = findItem.quantity;
            price = findItem.price;
            money = findItem.money;
            discount = findItem.discount;
        }

        return (
            <div>
                {/* <ProductCodeInput form={form} k={key} loadValue={code} />
                <ProductNameInput form={form} k={key} loadValue={name} />
                <SelectCategory form={form} k={key} values={categories} loadValue={categoryId} />
                <SelectGroup form={form} k={key} values={groups} loadValue={groupId} />
                <SelectClass form={form} k={key} values={classes} loadValue={classId} />
                <ProductNoteTextArea form={form} k={key} loadValue={note} /> */}
                <SelectProduct form={form} values={products} loadValue={productId} />
                <InputQuantity form={form} loadValue={quantity} />
                <InputPrice form={form} loadValue={price} />
                <InputMoney form={form} loadValue={money} />
                <InputDiscount form={form} loadValue={discount} />
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
                // const { productName, productCode, productNote, productCategory, productGroup, productClass } = values;
                // const { productId } = this.props;

                // const product = {
                //     key: productId,
                //     name: productName,
                //     code: productCode,
                //     note: productNote,
                //     categoryId: productCategory,
                //     groupId: productGroup,
                //     classId: productClass,
                // };

                // if (!isDynamic) {
                //     await this.props.update(productId, product);
                // }
                // else {
                //     await this.props.updateDynamic(productId, product);
                // }
                // this.closeModal();
            });

        }, LOADING_TIMEOUT);

    }

    render() {
        const { visible } = this.props;
        const { confirmLoading } = this.state;
        return (
            <Modal
                visible={visible}
                title="Cập nhật sản phẩm"
                okText="Đồng ý"
                cancelText="Hủy bỏ"
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

// const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
//     products: state.staticProducts,
// });

// const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
//     update: (productId: number | string, product: any) => dispatch(update(productId, product)),
//     updateDynamic: (productId: number | string, product: any) => dispatch(updateDynamic(productId, product)),
// });

// const FormInModal = Form.create<IProps>({ name: 'modal-update' })(ModalUpdateProduct);

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(FormInModal);


const FormInModal = Form.create<IProps>({ name: 'modal-update' })(ModalUpdateProduct);

export default FormInModal;