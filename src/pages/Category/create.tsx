import React from 'react';

import {Button, Table} from 'antd';

import FormCreateCategory from './components/FormCreateCategory';
import ModalUpdateCategory from './components/ModalUpdateCategory';
import ModalRemoveCategory from './components/ModalRemoveCategory';

import {Category} from '../../store/category/static/types';
import {list} from '../../store/category/static/actions';

import {createMulti as saveAll} from '../../store/category/dynamic/actions';

import {AppState} from '../../store';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {Redirect} from 'react-router';

import {LOADING_TIMEOUT} from '../../constants';

interface OwnProps {
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {
    list: typeof list,
    saveAll: typeof saveAll
}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {
    categories: any,
    categoryKey: any,
    openRemoveModal: boolean,
    openUpdateModal: boolean,
    redirectToList: boolean,
    saveAllLoading: boolean
}

class Create extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            categories: [],
            categoryKey: null,
            openRemoveModal: false,
            openUpdateModal: false,
            redirectToList: false,
            saveAllLoading: false
        };

        console.warn = function () {
            return;
        };

        console.error = function () {
            return;
        }
    }

    componentWillReceiveProps(newProps: any) {
        console.log(newProps);
        const { categories } = newProps;
        this.setState({
            categories,
        });
    }

    async componentDidMount() {
        await this.props.list();

        const categories = this.props.categories;

        console.log("didMount", categories);

        this.setState({
            categories,
            redirectToList: false
        });
    }

    handleClickUpdate = (categoryKey: any) => {
        if (categoryKey) {
            this.setState({
                openUpdateModal: true,
                categoryKey: categoryKey
            })
        }
    };

    handleCloseModalUpdate = () => {
        this.setState({
            openUpdateModal: false,
        });
    };

    handleClickRemove = async (categoryKey: any) => {
        this.setState({
            categoryKey: categoryKey,
            openRemoveModal: true
        })
    };

    handleSaveAll = () => {
        this.setState({
            saveAllLoading: true
        });
        setTimeout(async () => {
            await this.props.saveAll(this.state.categories);
            this.setState({
                categories: [],
                redirectToList: true,
                saveAllLoading: false
            });

        }, LOADING_TIMEOUT);

        console.log("Save all");
    };

    render() {
        const columns = [
            {
                title: "Mã loại hàng",
                dataIndex: "code",
            },
            {
                title: "Tên loại hàng",
                dataIndex: "name",
            },
            {
                title: "Ghi chú",
                dataIndex: "note",
            },
            {
                title: "Thao tác",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button type="primary" onClick={() => this.handleClickUpdate(row.key)}>Cập nhật</Button>
                            -
                            <Button type="danger" onClick={() => this.handleClickRemove(row.key)}>Xóa</Button>
                        </div>
                    );
                },
            },
        ];

        const { categories, redirectToList, saveAllLoading } = this.state;

        const checkExistCategories = categories.length;

        if (redirectToList) {
            return <Redirect to="/categories" />
        }

        return (
            <div id="create-category">
                <div className="search-result-categories">
                    <FormCreateCategory />

                    <ModalUpdateCategory
                        categoryKey={this.state.categoryKey}

                        visible={this.state.openUpdateModal}

                        onCancel={() => { this.setState({ openUpdateModal: false }) }}
                    />

                    <ModalRemoveCategory
                        categoryKey={this.state.categoryKey}

                        visible={this.state.openRemoveModal}

                        onCancel={() => { this.setState({ openRemoveModal: false }) }}
                    />

                    {checkExistCategories ?
                        <Table pagination={false} columns={columns} dataSource={categories} rowKey="key" />
                        : null
                    }

                    <Button
                        style={
                            {
                                display: !checkExistCategories ? "none" : "block"
                            }
                        }
                        className="confirm-create-all"
                        type="primary"
                        loading={saveAllLoading}
                        onClick={this.handleSaveAll}>Xác nhận tạo loại hàng</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
    categories: state.staticCategories,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    list: () => dispatch(list()),
    saveAll: (categories: any) => dispatch(saveAll(categories))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
