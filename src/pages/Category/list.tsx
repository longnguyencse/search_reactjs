import React from 'react';

import { Button, Pagination, Table } from 'antd';

import {Link} from 'react-router-dom';


import {list} from '../../store/category/dynamic/actions';
import { Category } from '../../store/category/dynamic/types';

import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {DEFAULT_PAGE, DEFAULT_SIZE} from '../../constants';

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

        console.log(props);
        this.setState({
            total,
            totalPage,
            currentPage,
            categories
        });
    }

    onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        // this.setState({ selectedRowKeys });
    };

    onChangePage = async (page: number) => {
        const newPage = page - 1;
        await this.props.list(newPage);
    }

    render() {        
        const columns = [
            {
                title: "Category Code",
                dataIndex: "code",
            },
            {
                title: "Category Name",
                dataIndex: "name",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: () => <a href="#">Delete</a>,
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
                    <h1 className="page-list-title">Category List</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/categories/create">Add New</Link>
                        </Button>
                    </div>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={categories} rowKey={(record:any) => record.id} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Pagination className="pagination" onChange={this.onChangePage} defaultCurrent={1} total={total} />
                    </div>

                </div>
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