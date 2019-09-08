import React from 'react';

import {Form, Modal} from 'antd';

import InputCode from './InputCode';
import InputName from './InputName';
import InputNote from './InputNote';

import {ProductGroup} from '../../../store/group/static/types';
import {update} from '../../../store/group/static/actions';
import {AppState} from '../../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';

import {FormComponentProps} from 'antd/es/form';

import {LOADING_TIMEOUT} from '../../../constants';


interface OwnProps {
    groupKey: number | string,
    visible: boolean,
    onCancel: () => void,
}

interface StateProps {
    groups: ProductGroup[]
}

interface DispatchProps {
    update: typeof update,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    findGroups: any,
    confirmLoading: boolean
}

class ModalUpdate extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            findGroups: null,
            confirmLoading: false
        }
    }

    componentWillReceiveProps(newProps: any) {
        const {groups} = this.props;
        const {groupKey} = newProps;

        if (!groupKey) {
            return;
        }

        const find = groups.find((groups: any) => {
            return groups.key === groupKey;
        });

        this.setState({
            findGroups: find
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
        const {findGroups} = this.state;

        const key = null;

        let code = null;
        let name = null;
        let note = null;
        if (findGroups) {
            code = findGroups.code;
            name = findGroups.name;
            note = findGroups.note;
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
                const {groupKey} = this.props;
                const category = {
                    key: groupKey,
                    name: groupName,
                    code: groupCode,
                    note: groupNote
                };

                await this.props.update(groupKey, category);
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
    groups: state.staticGroupReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    update: (groupKey: number | string, groups: any) => dispatch(update(groupKey, groups)),
});

const FormInModal = Form.create<IProps>({name: 'modal-update'})(ModalUpdate);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormInModal);
