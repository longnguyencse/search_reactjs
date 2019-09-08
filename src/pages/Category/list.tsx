import React from 'react';

import { Button, Pagination, Radio, Table } from 'antd';

import {Link} from 'react-router-dom';

interface OwnProps {

}

interface DispatchProps {

}

interface StateProps {

}

type IProps = OwnProps & DispatchProps & StateProps;

interface IState {
    selectedRowKeys: any,
}

export default class List extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            selectedRowKeys: [],
        };
    }

    onSelectChange = (selectedRowKeys: any) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        // this.setState({ selectedRowKeys });
    };

    render() {
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

        let dataRender = [];
        for (let i = 0; i < 5; i++) {
            dataRender.push(
                {
                    key: i,
                    tenSanPham: `tenSanPham-${i}`,
                    maSanPham:  `maSanPham-${i}`,
                    trangThai: "Cho Duyet"
                }
            );
        }

        const { selectedRowKeys } = this.state;

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
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={dataRender} rowKey={(record:any) => record.key} />
                <div className="table-operations">
                    <div className="page-list-footer">
                        <Pagination className="pagination" defaultCurrent={1} total={500} />
                    </div>

                </div>
            </div>
        );
    }
}