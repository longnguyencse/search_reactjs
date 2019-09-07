import React from 'react';

import { Button, Table } from 'antd';

import FormCreateCategory from './components/FormCreateCategory';
import ModalUpdateCategory from './components/ModalUpdateCategory';
import ModalRemoveCategory from './components/ModalRemoveCategory';

import { Category } from '../../store/category/static/types';
import { list } from '../../store/category/static/actions';

import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

interface OwnProps {
    form?: any
}

interface StateProps {
    categories: Category[]
}

interface DispatchProps {
    list: typeof list,
}

type ICreateProps = OwnProps & StateProps & DispatchProps;

interface ICreateState {
    categories: any,
    categoryKey: any,
    openRemoveModal: boolean,
    openUpdateModal: boolean,
}

class Create extends React.Component<ICreateProps, ICreateState> {
    constructor(props: ICreateProps) {
        super(props);

        this.state = {
            categories: [],
            categoryKey: null,
            openRemoveModal: false,
            openUpdateModal: false,
        };

        console.warn = function () {
            return;
        }

        console.error = function () {
            return;
        }
    }

    componentWillReceiveProps(newProps: any) {
        this.setState({
            categories: newProps.categories
        });
    }

    async componentDidMount() {
        await this.props.list();

        const categories = this.props.categories;

        this.setState({
            categories
        });
    }

    handleClickUpdate = (categoryKey: any) => {
        if (categoryKey) {
            this.setState({
                openUpdateModal: true,
                categoryKey: categoryKey
            })
        }
    }

    handleCloseModalUpdate = () => {
        this.setState({
            openUpdateModal: false,
        });
    }

    handleClickRemove = async (categoryKey: any) => {
        this.setState({
            categoryKey: categoryKey,
            openRemoveModal: true
        })
    }

    handleCloseModalRemove = () => {
        this.setState({
            openRemoveModal: false,
        });
    }

    render() {
        const columns = [
            {
                title: "Category Code",
                dataIndex: "code",
            },
            {
                title: "Category Name",
                dataIndex: "name",
            },
            {
                title: "Category Note",
                dataIndex: "note",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text: any, row: any, index: any) => {
                    return (
                        <div>
                            <Button onClick={() => this.handleClickUpdate(row.key)}>Update - {row.key}</Button>
                            -
                            <Button onClick={() => this.handleClickRemove(row.key)}>Delete - {row.key}</Button>
                        </div>
                    );
                },
            },
        ];

        const { categories } = this.state;

        const checkExistCategories = categories.length;

        return (
            <div id="create-category">
                <div className="search-result-categories">
                    <FormCreateCategory />
                    
                    <ModalUpdateCategory
                        categoryKey={this.state.categoryKey}

                        visible={this.state.openUpdateModal}

                        onCancel={() => {this.setState({openUpdateModal: false})}}
                    />

                    <ModalRemoveCategory 
                        categoryKey={this.state.categoryKey}

                        visible={this.state.openRemoveModal}

                        onCancel={() => {this.setState({openRemoveModal: false})}}
                    />

                    {checkExistCategories ?
                        <Table pagination={false} columns={columns} dataSource={categories} rowKey="key" />
                        : null
                    }
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);
