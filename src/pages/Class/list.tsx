import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Pagination, Table} from "antd";
import {list} from '../../store/class/dynamic/actions';
import {Class} from "../../store/class/dynamic/types";
import ModalUpdate from "../Class/components/ModalUpdate";
import ModalRemove from '../Class/components/ModalRemove';

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
    categories: Class[],
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Class[],
    selectedRowKeys: any,
    categoryId: any,
    openUpdateModal: boolean,
    openRemoveModal: boolean,
}

class List extends React.Component<IProps, IState> {
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
                title: "Mã ngành hàng",
                dataIndex: "code",
            },
            {
                title: "Tên ngành hàng",
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
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.id)}>Cập nhật</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.id)}>Xóa</Button>
                        </div>
                    );
                },
            },
        ];

        const {selectedRowKeys, categories, total, totalPage, currentPage} = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div id="product-list" className="page-list">
                <div className="page-list-header">
                    <h1 className="page-list-title">Danh sách ngành hàng</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/classes/create">Tạo mới</Link>
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
                    classKey={this.state.categoryId}

                    visible={this.state.openUpdateModal}

                    onCancel={() => {
                        this.setState({openUpdateModal: false})
                    }}

                    isDynamic={true}
                />

                <ModalRemove
                    groupKey={this.state.categoryId}

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
    totalPage: state.dynamicClassReducer.totalPage,
    currentPage: state.dynamicClassReducer.currentPage,
    total: state.dynamicClassReducer.total,
    categories: state.dynamicClassReducer.categories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
