import React from "react";

import {Button, Pagination, Radio, Table} from 'antd';

// import './styles.scss';

const columns = [
    {
        title: "Ngày tạo",
        dataIndex: "ngayTao",
    },
    {
        title: "Ngày giao hàng",
        dataIndex: "ngayGiaoHang",
    },
    {
        title: "Mã đơn hàng",
        dataIndex: "maPO",
    },
    {
        title: "Nhà cung cấp",
        dataIndex: "nhaCungCap",
    },
    {
        title: "Tên sản phẩm",
        dataIndex: "tenSanPham",
    },
    {
        title: "Số lượng",
        dataIndex: "soLuong",
    },
    {
        title: "Đơn vị",
        dataIndex: "donVi",
    },
    {
        title: "Thành tiền",
        dataIndex: "thanhTien",
    },
    {
        title: "Trang Thai",
        dataIndex: "trangThai",
    },
    {
        title: "Thao tác",
        dataIndex: "action",
        render: () => <a href="#">Delete</a>,
    },

];

export default class List extends React.Component<IListProps, IListState> {
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
                    ngayTao: "1/1/2019",
                    ngayGiaoHang: "2/1/2019",
                    maPO: `maPO-${i}`,
                    nhaCungCap: `nhaCungCap-${i}`,
                    tenSanPham: `tenSanPham-${i}`,
                    soLuong,
                    donVi: "Gi Cung Duoc",
                    thanhTien,
                    trangThai: "Cho Duyet"
                }
            );

            this.dataDaDuyet.push(
                {
                    key: i,
                    ngayTao: "1/1/2019",
                    ngayGiaoHang: "2/1/2019",
                    maPO: `maPO-${i}`,
                    nhaCungCap: `nhaCungCap-${i}`,
                    tenSanPham: `tenSanPham-${i}`,
                    soLuong,
                    donVi: "Gi Cung Duoc",
                    thanhTien,
                    trangThai: "Da Duyet"
                }
            );

            this.dataHuy.push(
                {
                    key: i,
                    ngayTao: "1/1/2019",
                    ngayGiaoHang: "2/1/2019",
                    maPO: `maPO-${i}`,
                    nhaCungCap: `nhaCungCap-${i}`,
                    tenSanPham: `tenSanPham-${i}`,
                    soLuong,
                    donVi: "Gi Cung Duoc",
                    thanhTien,
                    trangThai: "Huy"
                }
            );
        }

        this.state = {
            selectedRowKeys: [],
            mode: 'daDuyet'
        };
    }

    onSelectChange = (selectedRowKeys: Array<Object>) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
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
            <div id="po-list" className="page-list">
                <div className="page-list-header">
                    <h3 className="page-list-title">Danh sach PO</h3>
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
                        <Pagination className="pagination" defaultCurrent={6} total={500} />
                    </div>
                    
                </div>
            </div>
        );
    }
};

interface IListProps {
}

interface IListState {
    selectedRowKeys: any,
    mode: string
}
