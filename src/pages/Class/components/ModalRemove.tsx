import React from 'react';

import {Modal} from 'antd';


import {Class} from '../../../store/Class/static/types';
import {remove} from '../../../store/Class/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {LOADING_TIMEOUT} from '../../../constants';

interface OwnProps {
    groupKey: number | string,
    visible: boolean,
    onCancel: () => void,
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    remove: typeof remove
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

    componentWillReceiveProps(newProps: any) {
        const {data} = this.props;
        const {groupKey: key} = newProps;
        console.log('groupKey ', key);
        if (!key) {
            return;
        }

        const find = data.find((datas: any) => {
            return datas.key === key;
        });

        let modalText = "";
        if (find) {
            modalText = `Do you want remove group with name is : ${find.name}`;
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
            modalText: 'The modal will be closed after one second',
            confirmLoading: true,
        });
        setTimeout(async () => {

            const {groupKey} = this.props;

            await this.props.remove(groupKey);

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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemoveCategory);
