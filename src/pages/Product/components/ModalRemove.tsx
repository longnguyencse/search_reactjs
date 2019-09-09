import React from 'react';

import { Modal } from 'antd';


import { Product } from '../../../store/product/static/types';
import { remove } from '../../../store/product/static/actions';

// import {executeGet, executeRemove, list} from '../../../store/product/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {LOADING_TIMEOUT, DEFAULT_PAGE, DEFAULT_SIZE} from '../../../constants';

import { findElementInArrayObjectByAttribute } from '../../../helpers';

interface OwnProps {
    productKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    currentPage?: number
}

interface StateProps {
    products: Product[]
}

interface DispatchProps {
    remove: typeof remove
    // list: typeof list,
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    modalText: string,
    confirmLoading: boolean,
}


class ModalRemoveProduct extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            modalText: 'Content of the modal',
            confirmLoading: false,
        };

    }

    async componentWillReceiveProps(newProps: any) {
        const { products } = this.props;
        const { productKey, isDynamic } = newProps;

        if (!productKey) {
            return;
        }

        let findProduct;
        if(!isDynamic){
            findProduct = findElementInArrayObjectByAttribute(products, 'key', productKey);
        }
        else {
            // findProduct = await executeGet(productKey);
        }

        let modalText = "";
        if (findProduct) {
            modalText = `Do you want remove product with name is : ${findProduct.name}`;
        }

        this.setState({
            modalText,
        });


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

            const {productKey, isDynamic, currentPage} = this.props;

            if(!isDynamic && !currentPage){
                await this.props.remove(productKey);
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
                title="Remove Product"
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
    products: state.staticProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    remove: (productKey: number | string) => dispatch(remove(productKey)),
    // list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveProduct);