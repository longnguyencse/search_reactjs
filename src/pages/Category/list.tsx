import React from 'react';
import {Button, Pagination, Table} from 'antd';
import {Link} from 'react-router-dom';
import {list} from '../../store/category/dynamic/actions';
import {Category} from '../../store/category/dynamic/types';
import {AppState} from '../../store';
import {connect} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../constants';
import ModalUpdateCategory from './components/ModalUpdateCategory';
import ModalRemoveCategory from './components/ModalRemoveCategory';

interface OwnProps {

}

interface DispatchProps {
    list: typeof list,
}

interface StateProps {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Category[],
}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    total: number,
    totalPage: number,
    currentPage: number,
    categories: Category[],
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
            openRemoveModal :false
        };
    }

    componentWillReceiveProps(newProps: any){
        this.loadList(newProps)
    }

    async componentDidMount(){
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
    }

    onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onChangePage = async (page: number) => {
        const newPage = page - 1;
        await this.props.list(newPage);
    }

    handleClickUpdate = (categoryId: any) => {
        console.log("handleClickUpdate", categoryId)
        if (categoryId) {
            this.setState({
                openUpdateModal: true,
                categoryId
            })
        }
    }

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
                title: "Mã Loại Hàng",
                dataIndex: "code",
            },
            {
                title: "Tên Loại Hàng",
                dataIndex: "name",
            },
            {
                title: "Ghi Chú",
                dataIndex: "note",
            },
            {
                title: "Thao Tác",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.id)}>Update - {row.id}</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.id)}>Delete - {row.id}</Button>
                        </div>
                    );
                },
            },
        ];

        const { selectedRowKeys, categories, total, totalPage, currentPage } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        
        return (
            <div id="product-list" className="page-list">
                <div className="page-list-header">
                    <h1 className="page-list-title">Danh Sách Loại Hàng</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/categories/create">Tạo Loại Hàng</Link>
                        </Button>
                    </div>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={categories} rowKey={(record:any) => record.id} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Pagination className="pagination" onChange={this.onChangePage} defaultCurrent={1} total={total} />
                    </div>

                </div>

                <ModalUpdateCategory
                    categoryKey={this.state.categoryId}

                    visible={this.state.openUpdateModal}

                    onCancel={() => { this.setState({ openUpdateModal: false }) }}

                    isDynamic={true}
                />

                <ModalRemoveCategory
                    categoryKey={this.state.categoryId}

                    visible={this.state.openRemoveModal}

                    onCancel={() => { this.setState({ openRemoveModal: false }) }}

                    isDynamic={true}

                    currentPage={this.state.currentPage}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    totalPage: state.dynamicCategories.totalPage,
    currentPage: state.dynamicCategories.currentPage,
    total: state.dynamicCategories.total,
    categories: state.dynamicCategories.categories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
