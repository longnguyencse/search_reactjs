import React from 'react';

import {Button, Table} from 'antd';

import FormCreate from './components/FormCreate';
import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import {Class} from '../../store/class/static/types';

import {list} from '../../store/class/static/actions';
import {createMulti as saveAll} from '../../store/class/dynamic/actions';

import {AppState} from '../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {Redirect} from 'react-router';
import {LOADING_TIMEOUT} from "../../constants";

interface OwnProps {
    form?: any
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    data: any,
    classKey: any,
    openRemoveModal: boolean,
    openUpdateModal: boolean,
    redirectToList: boolean,
    saveAllLoading: boolean
}

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            classKey: null,
            openRemoveModal: false,
            openUpdateModal: false,
            redirectToList: false,
            saveAllLoading: false
        };
        console.warn = function () {
            return;
        };

        console.error = function () {
            return;
        };
    }

    componentWillReceiveProps(newProps: any) {
        const {data} = newProps;
        this.setState({
            data,
        });
    }

    async componentDidMount() {
        await this.props.list();
        const data = this.props.data;


        this.setState({
            data,
            redirectToList: false
        });
    }

    handleClickUpdate = (key: any) => {
        if (key) {
            this.setState({
                classKey: key,
                openUpdateModal: true,
            })
        }
    };

    handleClickRemove = async (key: any) => {
        this.setState({
            classKey: key,
            openRemoveModal: true
        })
    };

    handleSaveAll = () => {
        this.setState({
            saveAllLoading: true
        });
        setTimeout(async () => {
            await this.props.saveAll(this.state.data);
            this.setState({
                data: [],
                redirectToList: true,
                saveAllLoading: false
            });

        }, LOADING_TIMEOUT);

    };

    render() {
        const columns = [
            {
                title: "Class Code",
                dataIndex: "code",
            },
            {
                title: "Class Name",
                dataIndex: "name",
            },
            {
                title: "Class Note",
                dataIndex: "note",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.key)}>Cập nhật</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.key)}>Xóa</Button>
                        </div>
                    );
                },
            },
        ];

        const {data, redirectToList, saveAllLoading} = this.state;

        const checkExistCategories = data.length;

        if (redirectToList) {
            return <Redirect to="/classes"/>
        }

        return (
            <div id="create-classes">
                <div className="search-result-categories">
                    <FormCreate/>

                    <ModalUpdate
                        classKey={this.state.classKey}

                        visible={this.state.openUpdateModal}

                        onCancel={() => {
                            this.setState({openUpdateModal: false})
                        }}
                    />

                    <ModalRemove
                        groupKey={this.state.classKey}

                        visible={this.state.openRemoveModal}

                        onCancel={() => {
                            this.setState({openRemoveModal: false})
                        }}
                    />

                    {checkExistCategories ?
                        <Table pagination={false} columns={columns} dataSource={data} rowKey="key"/>
                        : null
                    }

                    <Button
                        style={
                            {
                                display: !checkExistCategories ? "none" : "block"
                            }
                        }
                        className="confirm-create-all"
                        type="primary"
                        loading={saveAllLoading}
                        onClick={this.handleSaveAll}> Xác nhận tạo lớp hàng </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    data: state.staticClassReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (data: any) => dispatch(saveAll(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
