import React from 'react';
import {Supplier} from "../../../store/supplier/static/types";
import {update} from "../../../store/supplier/static/actions";
import {executeGet, update as updateDynamic} from "../../../store/supplier/dynamic/actions";
import {FormComponentProps} from "antd/es/form";
import {findElementInArrayObjectByAttribute} from "../../../helpers";
import {LOADING_TIMEOUT} from "../../../constants";
import {Form, Modal} from "antd";
import {AppState} from "../../../store";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import EmailInput from "./EmailInput";
import CodeInput from "./CodeInput";
import NameInput from "./NameInput";
import AddressInput from "./AddressInput";
import PhoneInput from "./PhoneInput";


interface OwnProps {
    supplierKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean
}

interface StateProps {
    data: Supplier[]
}

interface DispatchProps {
    update: typeof update,
    updateDynamic: typeof updateDynamic,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    find: any,
    confirmLoading: boolean
}

class ModalUpdate extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            find: null,
            confirmLoading: false
        }
    }

    async componentWillReceiveProps(newProps: any) {
        console.log('data ', newProps);

        const {data} = this.props;
        const {supplierKey, isDynamic} = newProps;
        if (!supplierKey) {
            return;
        }

        let find;
        if (!isDynamic) {
            find = findElementInArrayObjectByAttribute(data, 'key', supplierKey);
        } else {
            find = await executeGet(supplierKey);
        }

        this.setState({
            find: find
        });
    }

    closeModal = () => {
        this.props.form.resetFields();
        this.props.onCancel();
        this.setState({
            confirmLoading: false,
        });
    };

    getFields = () => {
        const {form} = this.props;
        const {find} = this.state;

        const key = null;

        let code = null;
        let name = null;
        let email = null;
        let address = null;
        let phone = null;

        if (find) {
            code = find.code;
            name = find.name;
            email = find.email;
            address = find.address;
            phone = find.phone;
        }

        return (
            <div>
                <CodeInput form={form} k={key} loadValue={code}/>
                <NameInput form={form} k={key} loadValue={name}/>
                <EmailInput form={form} k={key} loadValue={email}/>
                <AddressInput form={form} k={key} loadValue={address}/>
                <PhoneInput form={form} k={key} loadValue={phone}/>
            </div>
        );
    };

    handleSubmit = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            const {form, isDynamic} = this.props;
            form.validateFields(async (err, values) => {
                if (err) {
                    return;
                }
                const {code, name, email, address, phone} = values;
                const {supplierKey} = this.props;
                const data = {
                    key: supplierKey,
                    code: code,
                    name: name,
                    email: email,
                    address: address,
                    phone: phone
                };
                if (!isDynamic) {
                    await this.props.update(supplierKey, data);
                } else {
                    await this.props.updateDynamic(supplierKey, data);
                }
                await this.props.update(supplierKey, data);
                this.closeModal();
            });

        }, LOADING_TIMEOUT);

    };

    render() {
        const {visible} = this.props;
        const {confirmLoading} = this.state;
        return (
            <Modal
                visible={visible}
                title="Cập nhật nhà cung cấp"
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

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    data: state.staticSupplierReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    update: (key: number | string, data: any) => dispatch(update(key, data)),
    updateDynamic: (categoryKey: number | string, category: any) => dispatch(updateDynamic(categoryKey, category)),
});

const ModalUpdateSupplier = Form.create<IProps>({name: 'modal-update'})(ModalUpdate);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalUpdateSupplier);

