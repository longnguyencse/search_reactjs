import React from 'react';

import {Button, Table} from 'antd';
import FormCreate from "./components/FormCreate";
import ModalRemove from "./components/ModalRemove";
import {Supplier} from "../../store/supplier/static/types";
import {list} from "../../store/supplier/static/actions";
import {createMulti as saveAll} from "../../store/supplier/dynamic/actions";
import {LOADING_TIMEOUT} from "../../constants";
import {Redirect} from "react-router";
import {AppState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import ModalUpdate from "./components/ModalUpdate";

interface OwnProps {
    form?: any
}

interface StateProps {
    data: Supplier[]
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    data: any,
    supplierKey: any,
    openRemoveModal: boolean,
    openUpdateModal: boolean,
    redirectToList: boolean,
    saveAllLoading: boolean
}

class CreateSupplier extends React.Component <IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            data: [],
            supplierKey: null,
            openRemoveModal: false,
            openUpdateModal: false,
            redirectToList: false,
            saveAllLoading: false
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
                supplierKey: key,
                openUpdateModal: true,
            })
        }
    };

    handleClickRemove = async (key: any) => {
        this.setState({
            supplierKey: key,
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
                title: "Tên nhà cung cấp",
                dataIndex: "name",
            },
            {
                title: "Mã nhà cung cấp",
                dataIndex: "code",
            },
            {
                title: "Email",
                dataIndex: "email",
            },
            {
                title: "Địa chỉ",
                dataIndex: "address",
            },
            {
                title: "Điện thoại",
                dataIndex: "phone",
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

        const {data, redirectToList, saveAllLoading} = this.state;

        const checkExistCategories = data.length;

        if (redirectToList) {
            return <Redirect to="/suppliers"/>
        }


        // const {expand} = this.state;
        return (
            <div id="create-supplier">
                <FormCreate/>
                <ModalRemove
                    supplierKey={this.state.supplierKey}

                    visible={this.state.openRemoveModal}

                    onCancel={() => {
                        this.setState({openRemoveModal: false})
                    }}
                />
                <ModalUpdate
                    supplierKey={this.state.supplierKey}

                    visible={this.state.openUpdateModal}

                    onCancel={() => {
                        this.setState({openUpdateModal: false})
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
                    onClick={this.handleSaveAll}> Xác nhận tạo nhà cung cấp </Button>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    data: state.staticSupplierReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (data: any) => dispatch(saveAll(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSupplier);
