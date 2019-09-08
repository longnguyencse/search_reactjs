import React from 'react';

import {Form, Modal} from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import InputNote from './InputNote';

import {Class} from '../../../store/Class/static/types';
import {update} from '../../../store/Class/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';


interface OwnProps {
    key: number | string,
    visible: boolean,
    onCancel: () => void,
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    update: typeof update,
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

    componentWillReceiveProps(newProps: any) {
        console.log('data ', newProps);

        const {data} = this.props;
        const {key} = newProps;
        if (!key) {
            return;
        }

        const find = data.find((rs: any) => {
            return rs.key === key;
        });

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
        let note = null;
        if (find) {
            code = find.code;
            name = find.name;
            note = find.note;
        }

        return (
            <div>
                <InputCode form={form} k={key} loadValue={code}/>
                <InputName form={form} k={key} loadValue={name}/>
                <InputNote form={form} k={key} loadValue={note}/>
            </div>
        );
    };

    handleSubmit = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            const {form} = this.props;
            form.validateFields(async (err, values) => {
                if (err) {
                    return;
                }
                const {groupName, groupCode, groupNote} = values;
                const {key} = this.props;
                const data = {
                    key: key,
                    name: groupName,
                    code: groupCode,
                    note: groupNote
                };

                await this.props.update(key, data);
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
                title="Update a category"
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
    data: state.staticClassReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    update: (key: number | string, data: any) => dispatch(update(key, data)),
});

const FormInModal = Form.create<IProps>({name: 'modal-update'})(ModalUpdate);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormInModal);
