import React from 'react';
import {Supplier} from "../../../store/supplier/static/types";
import {remove} from "../../../store/supplier/static/actions";
import {executeGet, executeRemove, list} from "../../../store/supplier/dynamic/actions";
import {findElementInArrayObjectByAttribute} from "../../../helpers";
import {DEFAULT_PAGE, DEFAULT_SIZE, LOADING_TIMEOUT} from "../../../constants";
import {Modal} from "antd";
import {AppState} from "../../../store";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";

interface OwnProps {
    supplierKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean,
    currentPage?: number
}

interface StateProps {
    data: Supplier[]
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

class ModalRemove extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            modalText: 'Content of the modal',
            confirmLoading: false,
        };

    }

    async componentWillReceiveProps(newProps: any) {
        const {data} = this.props;
        const {supplierKey: key, isDynamic} = newProps;
        console.log('supplierKey ', key, newProps);
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

            const {supplierKey, isDynamic, currentPage} = this.props;

            if (!isDynamic && !currentPage) {
                await this.props.remove(supplierKey);
            } else {
                const checkRemove = await executeRemove(supplierKey);
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
                title="Remove supplier"
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
    data: state.staticSupplierReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    remove: (key) => dispatch(remove(key)),
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalRemove);

