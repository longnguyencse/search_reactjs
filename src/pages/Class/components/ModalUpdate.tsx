import React from 'react';

import {Form, Modal} from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import InputNote from './InputNote';

import {Class} from '../../../store/class/static/types';
import {update} from '../../../store/class/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';
import {findElementInArrayObjectByAttribute} from "../../../helpers";
import {executeGet, update as updateDynamic} from "../../../store/class/dynamic/actions";


interface OwnProps {
    classKey: number | string,
    visible: boolean,
    onCancel: () => void,
    isDynamic?: boolean
}

interface StateProps {
    data: Class[]
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
        const {classKey, isDynamic} = newProps;
        if (!classKey) {
            return;
        }

        let find;
        if (!isDynamic) {
            find = findElementInArrayObjectByAttribute(data, 'key', classKey);
        } else {
            find = await executeGet(classKey);
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
            const {form, isDynamic} = this.props;
            form.validateFields(async (err, values) => {
                if (err) {
                    return;
                }
                const {groupName, groupCode, groupNote} = values;
                const {classKey} = this.props;
                const data = {
                    key: classKey,
                    name: groupName,
                    code: groupCode,
                    note: groupNote
                };
                if (!isDynamic) {
                    await this.props.update(classKey, data);
                } else {
                    await this.props.updateDynamic(classKey, data);
                }
                await this.props.update(classKey, data);
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
    updateDynamic: (categoryKey: number | string, category: any) => dispatch(updateDynamic(categoryKey, category)),
});

const FormInModal = Form.create<IProps>({name: 'modal-update'})(ModalUpdate);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormInModal);
