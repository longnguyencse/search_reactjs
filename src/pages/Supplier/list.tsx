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
        this.setState({selectedRowKeys});
    };

    onChangePage = async (page: number) => {
        const newPage = page - 1;
        await this.props.list(newPage);
    };

    handleClickUpdate = (categoryId: any) => {
        if (categoryId) {
            this.setState({
                openUpdateModal: true,
                categoryId
            })
        }
    };

    handleClickRemove = async (categoryId: any) => {
        this.setState({
            categoryId,
            openRemoveModal: true
        })
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
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.id)}>Cập nhật</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.id)}>Xóa</Button>
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
                    <h1 className="page-list-title">Danh sách nhà cung cấp</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/suppliers/create">Tạo mới</Link>
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
