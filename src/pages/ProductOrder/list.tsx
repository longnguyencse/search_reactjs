import React from "react";
import { Link } from 'react-router-dom';

import { Table, Button } from 'antd';

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
        title: "Action",
        dataIndex: "action",
        render: () => <a href="#">Delete</a>,
    },
    {
        title: "Ngay tao 1",
        dataIndex: "ngayTao1",
    },

];

export default class List extends React.Component<IListProps, IListState> {
    private data: any[] = new Array();

    constructor(props: IListProps) {
        super(props);

        for (let i = 0; i < 46; i++) {
            const soLuong = i + 1;
            const thanhTien = 1000 * soLuong;
            this.data.push(
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
        }

        this.state = {
            selectedRowKeys: [],
        };
    }

    onSelectChange = (selectedRowKeys: Array<Object>) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return <Table rowSelection={rowSelection} columns={columns} dataSource={this.data} rowKey={record => record.key} />;
    }
};

interface IListProps {
}

interface IListState {
    selectedRowKeys: any
}
