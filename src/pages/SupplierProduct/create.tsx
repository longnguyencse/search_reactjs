import React from 'react';

import {Form} from 'antd';

interface ICreateProductProps {
    form?: any,
}

interface ICreateProductState {
    expand: boolean,
    productNumber: number,
    products: any,
}

class CreateProduct extends React.Component<ICreateProductProps, ICreateProductState> {
    constructor(props: ICreateProductProps) {
        super(props);

        this.state = {
            expand: false,
            productNumber: 1,
            products: null
        };
    }

    // onSelectChange = (selectedRowKeys: any) => {
    //     console.log('selectedRowKeys changed: ', selectedRowKeys);
    //     this.setState({selectedRowKeys});
    // };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [0] });
        const keys = getFieldValue('keys');
        const {products} = this.state;

        return (
            <div id="create-supplier-product">
                <span> Thông tin nhà cung cấp</span>
                {/* Information of supplier*/}
                {/*<Table pagination={false} columns={columns} dataSource={categories}*/}
                {/*       rowKey={(record: any) => record.id}/>*/}
                {/*<div className="table-operations">*/}
                {/*    <div className="page-list-footer">*/}
                {/*        <Pagination className="pagination" onChange={this.onChangePage} defaultCurrent={1}*/}
                {/*                    total={total}/>*/}
                {/*    </div>*/}

                {/*</div>*/}
                {/* Link add supplier-product and product detail*/}

                {/* Information of product provided by supplier*/}
            </div>
        );
    }
}

const CreateSupplierProductForm = Form.create({ name: 'create_supplier_product_form' })(CreateProduct);

export default CreateSupplierProductForm
