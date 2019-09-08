import React from 'react';

import {Button, Table} from 'antd';

import FormCreate from './components/FormCreate';
import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import {Class} from '../../store/Class/static/types';

import {list} from '../../store/Class/static/actions';

import {AppState} from '../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {Redirect} from 'react-router';

interface OwnProps {
    form?: any
}

interface StateProps {
    data: Class[]
}

interface DispatchProps {
    list: typeof list,
    // saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    data: any,
    key: any,
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
            key: null,
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
        console.log(newProps);
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
                openUpdateModal: true,
                key: key
            })
        }
    };

    handleClickRemove = async (key: any) => {
        this.setState({
            key: key,
            openRemoveModal: true
        })
    };

    handleSaveAll = () => {
        // this.setState({
        //     saveAllLoading: true
        // });
        // setTimeout(async () => {
        //     await this.props.saveAll(this.state.groups);
        //     this.setState({
        //         groups: [],
        //         redirectToList: true,
        //         saveAllLoading: false
        //     });
        //
        // }, LOADING_TIMEOUT);

        console.log("Save all");
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
                            <Button onClick={() => this.handleClickUpdate(row.key)}>Update - {row.key}</Button>
                            -
                            {/*<Button onClick={() => this.handleClickRemove(row.key)}>Delete - {row.key}</Button>*/}
                        </div>
                    );
                },
            },
        ];

        const {data, redirectToList, saveAllLoading} = this.state;

        const checkExistCategories = data.length;

        if (redirectToList) {
            return <Redirect to="/categories"/>
        }

        return (
            <div id="create-category">
                <div className="search-result-categories">
                    <FormCreate/>

                    <ModalUpdate
                        key={this.state.key}

                        visible={this.state.openUpdateModal}

                        onCancel={() => {
                            this.setState({openUpdateModal: false})
                        }}
                    />

                    <ModalRemove
                        groupKey={this.state.key}

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
                        onClick={this.handleSaveAll}> Confirm create all product group </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    data: state.staticClassReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list())
    // saveAll: (groups: any) => dispatch(saveAll(groups))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
