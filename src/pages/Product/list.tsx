import React from "react";

import {Button, Pagination, Radio, Table} from 'antd';

import {Product} from '../../store/product/types';
import {list} from '../../store/product/dynamic/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import {Link} from 'react-router-dom';
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../../constants";

import ModalUpdate from './components/ModalUpdate';
import ModalRemove from './components/ModalRemove';

import { executeList as getCategories } from '../../store/category/dynamic/actions';
import { executeList as getGroups } from '../../store/group/dynamic/actions';
import { executeList as getClasses } from '../../store/class/dynamic/actions';

interface OwnProps {

}

interface StateProps {
    total: number,
    totalPage: number,
    currentPage: number,
    products: Product[],
}

interface DispatchProps {
    list: typeof list,
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    total: number,
    totalPage: number,
    currentPage: number,
    products: Product[],
    selectedRowKeys: any,
    productId: any,
    openUpdateModal: boolean,
    openRemoveModal: boolean,
    categories: any,
    groups: any,
    classes: any,
}


class List extends React.Component<IProps, IState> {
    private dataChoDuyet: any[] = new Array();
    private dataDaDuyet: any[] = new Array();
    private dataHuy: any[] = new Array();
    private link: string = "";
    constructor(props: IProps) {
        super(props);

        for (let i = 0; i < 5; i++) {
            const soLuong = i + 1;
            const thanhTien = 1000 * soLuong;
            this.dataChoDuyet.push(
                {
                    key: i,
                    tenSanPham: `tenSanPham-${i}`,
                    maSanPham:  `maSanPham-${i}`,
                    trangThai: "Cho Duyet"
                }
            );

            this.dataDaDuyet.push(
                {
                    key: i,
                    tenSanPham: `tenSanPham-${i}`,
                    maSanPham:  `maSanPham-${i}`,
                    trangThai: "Da Duyet"
                }
            );

            this.dataHuy.push(
                {
                    key: i,
                    tenSanPham: `tenSanPham-${i}`,
                    maSanPham:  `maSanPham-${i}`,
                    trangThai: "Huy"
                }
            );
        }

        this.state = {
            total: 0,
            totalPage: 0,
            currentPage: 0,
            products: [],
            selectedRowKeys: [],
            productId: null,
            openUpdateModal: false,
            openRemoveModal :false,
            categories: [],
            groups: [],
            classes: [],
        };
    }

    componentWillReceiveProps(newProps: any){
        this.loadList(newProps)
    }

    async componentDidMount(){
        await this.props.list();
        await this.loadList(this.props);
    }

    loadList = async (props: any) => {
        const {total, totalPage, currentPage, products} = props;

        const responseCategory: any = await getCategories(0, 10000);
        const responseGroup: any = await getGroups(0, 1000);
        const responseClass: any = await getClasses(0, 1000);
        const categories = responseCategory && responseCategory.categories ? responseCategory.categories : [];
        const groups = responseGroup && responseGroup.categories ? responseGroup.categories : [];
        const classes = responseClass && responseClass.categories ? responseClass.categories : [];
        this.setState({
            products,
            
        });
        
        this.setState({
            total,
            totalPage,
            currentPage,
            products,
            categories,
            groups,
            classes
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

    handleClickUpdate = (productId: any) => {
        console.log("handleClickUpdate", productId)
        if (productId) {
            this.setState({
                openUpdateModal: true,
                productId
            })
        }
    }

    handleClickRemove = async (productId: any) => {
        console.log("handleClickRemove", productId);
        this.setState({
            productId,
            openRemoveModal: true
        })
    }

    render() {        
        const columns = [
            {
                title: "Product Code",
                dataIndex: "code",
            },
            {
                title: "Product Name",
                dataIndex: "name",
            },
            {
                title: "Product Note",
                dataIndex: "note",
            },
            {
                title: "Action",
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

        const { selectedRowKeys, products, total, totalPage, 
            currentPage, productId, openUpdateModal, categories, 
            groups, classes } = this.state;

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
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={products} rowKey={(record:any) => record.id} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Pagination className="pagination" onChange={this.onChangePage} defaultCurrent={1} total={total} />
                    </div>

                </div>

                <ModalUpdate
                    productKey={productId}

                    visible={openUpdateModal}

                    onCancel={() => { this.setState({ openUpdateModal: false }) }}

                    isDynamic={true}

                    categories={categories}

                    groups={groups}

                    classes={classes}
                />

                <ModalRemove
                    productKey={this.state.productId}

                    visible={this.state.openRemoveModal}

                    onCancel={() => { this.setState({ openRemoveModal: false }) }}

                    isDynamic={true}

                    currentPage={this.state.currentPage}
                />
            </div>
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    totalPage: state.dynamicProducts.totalPage,
    currentPage: state.dynamicProducts.currentPage,
    total: state.dynamicProducts.total,
    products: state.dynamicProducts.products,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE) => dispatch(list(page, size)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);