import React from 'react';

import { Modal } from 'antd';


import { Category } from '../../../store/category/static/types';
import { remove } from '../../../store/category/static/actions';

import {executeGet, executeRemove, list} from '../../../store/category/dynamic/actions';

import { AppState } from '../../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {LOADING_TIMEOUT, DEFAULT_PAGE, DEFAULT_SIZE} from '../../../constants';

interface OwnProps {
    categoryKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    currentPage?: number
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {
    remove: typeof remove
    list: typeof list,
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    modalText: string,
    confirmLoading: boolean,
}


class ModalRemoveCategory extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            modalText: 'Content of the modal',
            confirmLoading: false,
        };

    }

    async componentWillReceiveProps(newProps: any) {
        const { categories } = this.props;
        const { categoryKey, isDynamic } = newProps;

        if (!categoryKey) {
            return;
        }

        let findCategory;
        if(!isDynamic){
            findCategory = categories.find((category: any) => {
                return category.key === categoryKey;
            });
        }
        else {
            findCategory = await executeGet(categoryKey);
        }

        let modalText = "";
        if (findCategory) {
            modalText = `Do you want remove category with name is : ${findCategory.name}`;
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

            const {categoryKey, isDynamic, currentPage} = this.props;

            if(!isDynamic && !currentPage){
                await this.props.remove(categoryKey);
            }
            else {
                const checkRemove = await executeRemove(categoryKey);
                if(checkRemove){
                    await this.props.list(currentPage);
                }
                else {
                    console.error("Loi me gi roi");
                }
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
                title="Remove Category"
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
    categories: state.staticCategories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    remove: (categoryKey: number | string) => dispatch(remove(categoryKey)),
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveCategory);