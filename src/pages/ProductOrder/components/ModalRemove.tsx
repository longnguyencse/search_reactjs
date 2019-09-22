import React from 'react';

import { Modal } from 'antd';


import { Order } from '../../../store/order/static/types';
import { removeProduct } from '../../../store/order/static/actions';

// import {executeGet, executeRemove, list} from '../../../store/order/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {LOADING_TIMEOUT, DEFAULT_PAGE, DEFAULT_SIZE} from '../../../constants';

import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    productId: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    currentPage?: number
}

interface StateProps {
    order: Order
}

interface DispatchProps {
    removeProduct: typeof removeProduct
    // list: typeof list,
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    modalText: string,
    confirmLoading: boolean,
}


class ModalRemoveOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            modalText: 'Content of the modal',
            confirmLoading: false,
        };

    }

    async componentWillReceiveProps(newProps: any) {
        const { order } = this.props;
        const {items } = order;
        const { productId, isDynamic } = newProps;

        if (!productId) {
            return;
        }

        let findItem;
        if(!isDynamic){
            // findItem = findElementInArrayObjectByAttribute(items, 'productId', productId);
            // findOrder = findElementInArrayObjectByAttribute(products, 'key', productKey);
        }
        else {
            // findOrder = await executeGet(productKey);
        }

        // let modalText = "";
        // if (findOrder) {
        //     modalText = `bạn có muốn xóa sản phẩm tên : ${findOrder.name}`;
        // }

        // this.setState({
        //     modalText,
        // });


    }

    closeModal = () => {
        this.props.onCancel();

        this.setState({
            confirmLoading: false,
        });
    }

    handleOk = () => {
        this.setState({
            modalText: 'The modal will be closed after one second',
            confirmLoading: true,
        });
        setTimeout(async () => {

            const {productId, isDynamic, currentPage} = this.props;

            if(!isDynamic && !currentPage){
                await this.props.removeProduct(productId);
            }
            else {
                // const checkRemove = await executeRemove(productKey);
                // if(checkRemove){
                //     await this.props.list(currentPage);
                // }
                // else {
                //     console.error("Loi me gi roi");
                // }
            }

            this.closeModal();

        }, LOADING_TIMEOUT);
    };

    handleCancel = () => {
        this.closeModal();
    };

    render() {
        const { visible, onCancel } = this.props;
        const { confirmLoading, modalText } = this.state;

        return (
            <Modal
                title="Xóa sản phẩm"
                okText="Đồng ý"
                cancelText="Hủy bỏ"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    order: state.staticOrder,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    removeProduct: (productKey: number | string) => dispatch(removeProduct(productKey)),
    // list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveOrder);