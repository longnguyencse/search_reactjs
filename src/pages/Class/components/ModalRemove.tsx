import React from 'react';

import {Modal} from 'antd';


import {Class} from '../../../store/class/static/types';
import {remove} from '../../../store/class/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {DEFAULT_PAGE, DEFAULT_SIZE, LOADING_TIMEOUT} from '../../../constants';
import {findElementInArrayObjectByAttribute} from "../../../helpers";
import {executeGet, executeRemove, list} from "../../../store/class/dynamic/actions";

interface OwnProps {
    groupKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    currentPage?: number
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    remove: typeof remove,
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
        const {data} = this.props;
        const {groupKey: key, isDynamic} = newProps;
        console.log('groupKey ', key, newProps);
        if (!key) {
            return;
        }

        let find;
        if (!isDynamic) {
            find = findElementInArrayObjectByAttribute(data, 'key', key);
        } else {
            find = await executeGet(key);
        }


        let modalText = "";
        if (find) {
            modalText = `Bạn muốn xóa ngành hàng với tên là: ${find.name}`;
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
    };

    handleOk = () => {
        this.setState({
            modalText: 'Xin chờ chốc lát',
            confirmLoading: true,
        });
        setTimeout(async () => {

            const {groupKey, isDynamic, currentPage} = this.props;

            if (!isDynamic && !currentPage) {
                await this.props.remove(groupKey);
            } else {
                const checkRemove = await executeRemove(groupKey);
                if (checkRemove) {
                    await this.props.list(currentPage);
                } else {
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
        const {visible, onCancel} = this.props;
        const {confirmLoading, modalText} = this.state;

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
    data: state.staticClassReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    remove: (key) => dispatch(remove(key)),
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveCategory);
