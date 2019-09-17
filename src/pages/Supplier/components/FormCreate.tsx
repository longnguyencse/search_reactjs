import React from 'react';
import {Supplier} from "../../../store/supplier/static/types";
import {createMulti} from "../../../store/supplier/static/actions";
import {FormComponentProps} from "antd/es/form";
import Col from "antd/es/grid/col";
import {Button, Form, Row} from "antd";
import NameInput from "./NameInput";
import CodeInput from "./CodeInput";
import EmailInput from "./EmailInput";
import AddressInput from "./AddressInput";
import PhoneInput from "./PhoneInput";
import {AppState} from "../../../store";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {LOADING_TIMEOUT} from "../../../constants";

interface OwnProps {
}

interface StateProps {
    categories: Supplier[]
}

interface DispatchProps {
    createMulti: typeof createMulti,
}

type IProps = OwnProps & StateProps & DispatchProps & FormComponentProps;

interface IState {
    categories: any,
    loading: boolean,
    disabledButton: boolean,
}

let supplierNumber: number = 1;

class FormCreate extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            categories: [],
            loading: false,
            disabledButton: false
        };
        // console.warn = function () {
        //     return;
        // };

        // console.error = function () {
        //     return;
        // }
    }

    componentWillReceiveProps(nextProps: Readonly<OwnProps & StateProps & DispatchProps & FormComponentProps<any>>, nextContext: any): void {
        const {categories} = nextProps;
        this.setState({
            categories,
        });
    }

    getFields(keys: any) {
        const {form} = this.props;
        let buttonRemove: any = null;
        const childrens = keys.map((k: any, value: any) => {
            if (k > 0) {
                buttonRemove = (
                    <Col span={2}>
                        <Form.Item label={`Remove`}>
                            <Button type="danger" onClick={() => this.handleRemove(k)}>X</Button>
                        </Form.Item>
                    </Col>
                );
            }

            return (
                <div key={k}>
                    <Col span={4}>
                        <NameInput form={form} k={k}/>
                    </Col>
                    <Col span={4}>
                        <CodeInput form={form} k={k}/>
                    </Col>
                    <Col span={4}>
                        <EmailInput form={form} k={k}/>
                    </Col>
                    <Col span={6}>
                        <AddressInput form={form} k={k}/>
                    </Col>
                    <Col span={4}>
                        <PhoneInput form={form} k={k}/>
                    </Col>
                    {buttonRemove}
                </div>
            )
        });
        return childrens;
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            loading: false,
            disabledButton: false
        });
    };

    handleAddMore = () => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(supplierNumber++);

        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        getFieldDecorator('keys', {initialValue: [0]});
        const keys = getFieldValue('keys');
        const {loading, disabledButton} = this.state;
        return (
            <div id="address-supplier">
                <Form className="ant-advanced-create-form" onSubmit={this.handleSubmit}>
                    <h1>Tao nhà cung cấp</h1>
                    <Row gutter={24}>{this.getFields(keys)}</Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Đồng ý
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset} disabled={disabledButton}>
                                Tạo lại
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleAddMore} disabled={disabledButton}>
                                Thêm
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }

    handleRemove = (i: any) => {
        const {form} = this.props;

        const keys = form.getFieldValue('keys');

        // We need at least one product
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter((key: any) => key !== i),
        });
    };

    handleSubmit = async (e: any) => {
        e.preventDefault();
        const {categories} = this.state;

        let maxKey = 0;
        if (categories.length) {
            maxKey = Math.max.apply(Math, categories.map((category: any, index: any) => {
                return category.key;
            }));
        }

        this.props.form.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }
            this.setState({
                loading: true,
                disabledButton: true
            });

            setTimeout(() => {
                const {keys, name, code, email, address, phone} = values;
                const newCategories = keys.map((value: any, index: any) => {
                    maxKey++;
                    return {
                        key: maxKey,
                        name: name[value],
                        code: code[value],
                        email: email[value],
                        address: address[value],
                        phone: phone[value],
                    };
                });

                this.props.createMulti(newCategories);

                this.handleReset();

            }, LOADING_TIMEOUT);
        });
    }

}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    categories: state.staticSupplierReducer,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMulti: (categories: Supplier[]) => dispatch(createMulti(categories)),
});

const SupplierCreateForm = Form.create({name: 'create_supplier_form'})(FormCreate);

export default connect(mapStateToProps, mapDispatchToProps)(SupplierCreateForm);
