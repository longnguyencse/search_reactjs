import React from 'react';

import {Button, Table} from 'antd';

import FormCreate from './components/FormCreate';
import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import {ProductGroup} from '../../store/group/static/types';

import {list} from '../../store/group/static/actions';

import {AppState} from '../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {Redirect} from 'react-router';
import {createMulti as saveAll} from '../../store/group/dynamic/actions';
import {LOADING_TIMEOUT} from "../../constants";

interface OwnProps {
    form?: any
}

interface StateProps {
    groups: ProductGroup[]
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    groups: any,
    groupKey: any,
    openRemoveModal: boolean,
    openUpdateModal: boolean,
    redirectToList: boolean,
    saveAllLoading: boolean
}

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            groups: [],
            groupKey: null,
            openRemoveModal: false,
            openUpdateModal: false,
            redirectToList: false,
            saveAllLoading: false
        };
        console.warn = function () {
            return;
        };

        // console.error = function () {
        //     return;
        // };
    }

    componentWillReceiveProps(newProps: any) {
        const {groups} = newProps;
        this.setState({
            groups,
        });
    }

    async componentDidMount() {
        await this.props.list();

        const groups = this.props.groups;


        this.setState({
            groups,
            redirectToList: false
        });
    }

    handleClickUpdate = (groupKey: any) => {
        if (groupKey) {
            this.setState({
                openUpdateModal: true,
                groupKey: groupKey
            })
        }
    };

    handleClickRemove = async (groupKey: any) => {
        this.setState({
            groupKey: groupKey,
            openRemoveModal: true
        })
    };

    handleSaveAll = () => {
        this.setState({
            saveAllLoading: true
        });
        setTimeout(async () => {
            await this.props.saveAll(this.state.groups);
            this.setState({
                groups: [],
                redirectToList: true,
                saveAllLoading: false
            });

        }, LOADING_TIMEOUT);

    };

    render() {
        const columns = [
            {
                title: "Mã nhóm hàng",
                dataIndex: "code",
            },
            {
                title: "Tên nhóm hàng",
                dataIndex: "name",
            },
            {
                title: "Ghi chú",
                dataIndex: "note",
            },
            {
                title: "Thao tác",
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

        const {groups, redirectToList, saveAllLoading} = this.state;

        const checkExistCategories = groups.length;

        if (redirectToList) {
            return <Redirect to="/groups"/>
        }

        return (
            <div id="create-groups">
                <div className="search-result-categories">
                    <FormCreate/>

                    <ModalUpdate
                        groupKey={this.state.groupKey}

                        visible={this.state.openUpdateModal}

                        onCancel={() => {
                            this.setState({openUpdateModal: false})
                        }}
                    />

                    <ModalRemove
                        groupKey={this.state.groupKey}

                        visible={this.state.openRemoveModal}

                        onCancel={() => {
                            this.setState({openRemoveModal: false})
                        }}
                    />

                    {checkExistCategories ?
                        <Table pagination={false} columns={columns} dataSource={groups} rowKey="key"/>
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
                        onClick={this.handleSaveAll}> Xác nhận tạo nhóm hàng </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    groups: state.staticGroupReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (groups: any) => dispatch(saveAll(groups))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
