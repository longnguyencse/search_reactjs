import React from "react";

import { Button, Pagination, Radio, Table } from 'antd';

import { Order } from '../../store/order/dynamic/types';
import { list, executeChangeStatus as changeStatus } from '../../store/order/dynamic/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';
import { DEFAULT_PAGE, DEFAULT_SIZE } from "../../constants";
import { STATUS_APPROVED, STATUS_PENDING, STATUS_CANCEL } from "../../constants/order";

import {Link} from 'react-router-dom';


// import './styles.scss';

interface OwnProps {

}

interface StateProps {
    total: number,
    totalPage: number,
    currentPage: number,
    orders: Order[],
}

interface DispatchProps {
    list: typeof list,

}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    total: number,
    totalPage: number,
    currentPage: number,
    orders: Order[],
    selectedRowKeys: any,
    selectedRows: any,
    mode: string,
    status: string,
}

class List extends React.Component<IProps, IState> {
    private dataChoDuyet: any[] = new Array();
    private dataDaDuyet: any[] = new Array();
    private dataHuy: any[] = new Array();
    private link: string = "";
    
    constructor(props: IProps) {
        super(props);

        this.state = {
            total: 0,
            totalPage: 0,
            currentPage: 0,
            orders: [],
            selectedRowKeys: [],
            selectedRows: [],
            mode: STATUS_PENDING,
            status: STATUS_PENDING,
        };
    }

    componentWillReceiveProps(newProps: any){
        this.loadList(newProps)
    }

    async componentDidMount(){
        await this.props.list(DEFAULT_PAGE, DEFAULT_SIZE, {
            status: this.state.status
        });
        this.loadList(this.props);
    }

    loadList = async (props: any) => {
        const {total, totalPage, currentPage, orders} = props;

        // const responseCategory: any = await getCategories(0, 10000);
        // const responseGroup: any = await getGroups(0, 1000);
        // const responseClass: any = await getClasses(0, 1000);
        // const categories = responseCategory && responseCategory.categories ? responseCategory.categories : [];
        // const groups = responseGroup && responseGroup.categories ? responseGroup.categories : [];
        // const classes = responseClass && responseClass.categories ? responseClass.categories : [];
        
        this.setState({
            total,
            totalPage,
            currentPage,
            orders,
            // categories,
            // groups,
            // classes
        });
    }

    onSelectChange = (selectedRowKeys: any, selectedRows: any) => {
        this.setState({ selectedRowKeys, selectedRows });
    };

    selectPOStatus = async (e: any) => {
        const status = e.target.value;

        await this.props.list(DEFAULT_PAGE, DEFAULT_SIZE, {
            status
        });


        this.setState({
            status
        });
        // console.log(mode);
    };

    submitChageStatus = async (submitType: string = STATUS_APPROVED) => {
        const orders = this.state.selectedRows;
        const checkChange = await changeStatus(orders, submitType);
        if(checkChange){
            await this.props.list(this.state.currentPage, DEFAULT_SIZE, {
                status: this.state.status
            });
            this.setState({
                selectedRowKeys: [],
                selectedRows: []
            });
        }
        // if(submitType === STATUS_APPROVED){
        //     await changeStatus(orders)
        //     console.log("submitApprove", this.state.selectedRows);
        // }
        // else {
        //     console.log("submitCancel", this.state.selectedRows);
        // }
    }

    submitApprove = () => {
        this.submitChageStatus();
    }

    submitCancel = () => {
        this.submitChageStatus(STATUS_CANCEL);
    }

    render() {

        const columns = [
            {
                title: "Ngày tạo",
                dataIndex: "create_at",
            },
            {
                title: "Mã đơn hàng",
                dataIndex: "code",
            },
            {
                title: "Thành tiền",
                dataIndex: "money",
            },
            {
                title: "Trạng thái",
                dataIndex: "status",
            },
            // {
            //     title: "Action",
            //     dataIndex: "action",
            //     render: () => <a href="#">Delete</a>,
            // },

        ];

        const { selectedRowKeys, orders, total, totalPage, 
            currentPage, status } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div id="po-list" className="page-list">
                <div className="page-list-header">
                    <h1 className="page-list-title">Danh sách đơn hàng</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/po/create">Tạo mới</Link>
                        </Button>
                        <Radio.Group className="btn-change-status" onChange={this.selectPOStatus} value={status}>
                            <Radio.Button value={STATUS_PENDING}>Chờ duyệt</Radio.Button>
                            <Radio.Button value={STATUS_APPROVED}>Đã duyệt</Radio.Button>
                            <Radio.Button value={STATUS_CANCEL}>Hủy</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={orders} rowKey={(record:any) => record.id} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <div style={{
                            display: status === STATUS_PENDING ? "block" : "none" 
                        }}>
                            <Button className="btn-approve" type="primary" onClick={this.submitApprove}>Duyệt</Button>
                            <Button className="btn-cancel" type="danger" onClick={this.submitCancel}>Hủy</Button>
                        </div>
                        <Pagination className="pagination" defaultCurrent={1} total={total} />
                    </div>

                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    totalPage: state.dynamicOrders.totalPage,
    currentPage: state.dynamicOrders.currentPage,
    total: state.dynamicOrders.total,
    orders: state.dynamicOrders.orders,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: (page: number = DEFAULT_PAGE, size: number = DEFAULT_SIZE, options: any) => dispatch(list(page, size, options)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);