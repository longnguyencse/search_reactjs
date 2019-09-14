import React from 'react';
import {Button, Pagination, Table} from 'antd';
import {list} from "../../store/supplier/dynamic/actions";
import {Supplier} from "../../store/supplier/dynamic/types";
import {Link} from "react-router-dom";
import ModalRemove from "./components/ModalRemove";
import ModalUpdate from "./components/ModalUpdate";
import {AppState} from "../../store";
import {ThunkDispatch} from "redux-thunk";
import {DEFAULT_PAGE, DEFAULT_SIZE} from "../../constants";
import {connect} from "react-redux";


interface OwnProps {

}

interface DispatchProps {
    list: typeof list,
}

interface StateProps {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Supplier[],
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Supplier[],
    selectedRowKeys: any,
    categoryId: any,
    openUpdateModal: boolean,
    openRemoveModal: boolean,
}

class ListSupplier extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            total: 0,
            totalPage: 0,
            currentPage: 0,
            categories: [],
            selectedRowKeys: [],
            categoryId: null,
            openUpdateModal: false,
            openRemoveModal: false
        };

    }

    componentWillReceiveProps(newProps: any) {
        this.loadList(newProps)
    }

    async componentDidMount() {
        await this.props.list();
        this.loadList(this.props);
    }

    loadList = async (props: any) => {
        const {total, totalPage, currentPage, categories} = props;

        this.setState({
            total,
            totalPage,
            currentPage,
            categories
        });
    };

    onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    };

    onChangePage = async (page: number) => {
        const newPage = page - 1;
        await this.props.list(newPage);
    };

    handleClickUpdate = (categoryId: any) => {
        console.log("handleClickUpdate", categoryId)
        if (categoryId) {
            this.setState({
                openUpdateModal: true,
                categoryId
            })
        }
    };

    handleClickRemove = async (categoryId: any) => {
        console.log("handleClickRemove", categoryId);
        this.setState({
            categoryId,
            openRemoveModal: true
        })
    };

    render() {
        const columns = [
            {
                title: "Supplier  Name",
                dataIndex: "name",
            },
            {
                title: "Supplier Code",
                dataIndex: "code",
            },
            {
                title: "Supplier Email",
                dataIndex: "email",
            },
            {
                title: "Supplier Address",
                dataIndex: "address",
            },
            {
                title: "Supplier Phone",
                dataIndex: "phone",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button onClick={() => this.handleClickUpdate(row.id)}>Update - {row.id}</Button>
                            -
                            <Button onClick={() => this.handleClickRemove(row.id)}>Delete - {row.id}</Button>
                        </div>
                    );
                }
            }
        ];

        const {selectedRowKeys, categories, total, totalPage, currentPage} = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div id="supplier-list" className="page-list">
                <div className="page-list-header">
                    <h1 className="page-list-title">Category List</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/suppliers/create">Add New</Link>
                        </Button>
                    </div>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={categories}
                       rowKey={(record: any) => record.id}/>
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Pagination className="pagination" onChange={this.onChangePage} defaultCurrent={1}
                                    total={total}/>
                    </div>

                </div>

                <ModalUpdate
                    supplierKey={this.state.categoryId}

                    visible={this.state.openUpdateModal}

                    onCancel={() => {
                        this.setState({openUpdateModal: false})
                    }}

                    isDynamic={true}
                />

                <ModalRemove
                    supplierKey={this.state.categoryId}

                    visible={this.state.openRemoveModal}

                    onCancel={() => {
                        this.setState({openRemoveModal: false})
                    }}

                    isDynamic={true}

                    currentPage={this.state.currentPage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    totalPage: state.dynamicSupplierReducer.totalPage,
    currentPage: state.dynamicSupplierReducer.currentPage,
    total: state.dynamicSupplierReducer.total,
    categories: state.dynamicSupplierReducer.categories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListSupplier);
