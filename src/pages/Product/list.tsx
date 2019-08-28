import React from "react";

import {Button, Pagination, Radio, Table} from 'antd';

import {Product} from '../../store/product/types';
import {listProduct} from '../../store/product/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

const columns = [
    {
        title: "Ten san pham",
        dataIndex: "tenSanPham",
    },
    {
        title: "Ma san pham",
        dataIndex: "maSanPham",
    },
    {
        title: "Trang Thai",
        dataIndex: "trangThai",
    },
    {
        title: "Action",
        dataIndex: "action",
        render: () => <a href="#">Delete</a>,
    },
];

interface OwnProps {

}

interface StateProps {
    products: {}
}

interface DispatchProps {
    listProduct: typeof listProduct,
}

type IListProps = OwnProps & StateProps & DispatchProps;

interface IListState {
    selectedRowKeys: any,
    mode: string
}


class List extends React.Component<IListProps, IListState> {
    private dataChoDuyet: any[] = new Array();
    private dataDaDuyet: any[] = new Array();
    private dataHuy: any[] = new Array();
    private link: string = "";
    constructor(props: IListProps) {
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
            selectedRowKeys: [],
            mode: 'daDuyet'
        };
    }

    async componentDidMount(){
        // console.log(123);
        await this.props.listProduct();
    }

    onSelectChange = (selectedRowKeys: Array<Object>) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        // this.setState({ selectedRowKeys });
    };

    selectPOStatus = (e: any) => {
        const mode = e.target.value;

        this.setState({
            mode
        });
        console.log(mode);
    };

    render() {
        const { selectedRowKeys, mode } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        let dataRender = this.dataChoDuyet;
        switch (mode) {
            case "daDuyet": {
                dataRender = this.dataDaDuyet;
                break;
            }         
            case "huy": {
                dataRender = this.dataHuy;
                break;
            }
            default:
                break;
        }
        return (
            <div id="product-list" className="page-list">
                <div className="page-list-header">
                    <h3 className="page-list-title">Danh sach Product</h3>
                    <Radio.Group className="btn-change-status" onChange={this.selectPOStatus} value={mode}>
                        <Radio.Button value="choDuyet">Cho Duyet</Radio.Button>
                        <Radio.Button value="daDuyet">Da Duyet</Radio.Button>
                        <Radio.Button value="huy">Huy</Radio.Button>
                    </Radio.Group>
                </div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={dataRender} rowKey={record => record.key} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Button className="btn-approve" type="primary">Duyet</Button>
                        <Pagination className="pagination" defaultCurrent={1} total={500} />
                    </div>
                    
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    products: state.products.listProduct,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    listProduct: () => dispatch(listProduct())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);