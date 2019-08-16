import React from "react";
import { Link } from 'react-router-dom';

import { Table, Radio, Button } from 'antd';

import './styles.scss';

const columns = [
    {
        title: "Ngay tao",
        dataIndex: "ngayTao",
    },
    {
        title: "Ngay giao hang",
        dataIndex: "ngayGiaoHang",
    },
    {
        title: "Ma PO",
        dataIndex: "maPO",
    },
    {
        title: "Nha cung cap",
        dataIndex: "nhaCungCap",
    },
    {
        title: "Ten san pham",
        dataIndex: "tenSanPham",
    },
    {
        title: "So luong",
        dataIndex: "soLuong",
    },
    {
        title: "Don vi",
        dataIndex: "donVi",
    },
    {
        title: "Thanh tien",
        dataIndex: "thanhTien",
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

export default class List extends React.Component<IListProps, IListState> {
    private dataChoDuyet: any[] = new Array();
    private dataDaDuyet: any[] = new Array();
    private dataHuy: any[] = new Array();

    constructor(props: IListProps) {
        super(props);

        for (let i = 0; i < 46; i++) {
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
    }

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
            <div>
                <h3>Danh sach PO</h3>
                <Radio.Group className="btn-change-status" onChange={this.selectPOStatus} value={mode}>
                    <Radio.Button value="choDuyet">Cho Duyet</Radio.Button>
                    <Radio.Button value="daDuyet">Da Duyet</Radio.Button>
                    <Radio.Button value="huy">Huy</Radio.Button>
                </Radio.Group>
                <Table rowSelection={rowSelection} columns={columns} dataSource={dataRender} rowKey={record => record.key} />
                <div className="table-operations">
                    <Button>Sort age</Button>
                    <Button>Clear filters</Button>
                    <Button>Clear filters and sorters</Button>
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
