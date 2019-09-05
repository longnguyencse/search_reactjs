import React from 'react';

import {Button, Table, Modal} from 'antd';

import FormCreateCategory from './components/FormCreateCategory';
import FormUpdateCategory from './components/FormUpdateCategory';
import ModalDeleteCategory from './components/ModalDeleteCategory';

import {Category} from '../../store/category/types';
import {createMultiCategory} from '../../store/category/actions';
import { AppState } from '../../store';
import { connect } from 'react-redux';

import { ThunkDispatch } from 'redux-thunk';

import LocalStorage from '../../services/LocalStorage';

interface OwnProps {
    form?: any
}

interface StateProps {
    categories: null
}

interface DispatchProps {
    createMultiCategory: typeof createMultiCategory,
}

type ICreateCategoryProps = OwnProps & StateProps & DispatchProps;

interface ICreateCategoryState {
    categories: any,
    categoryKey: any,
    hideUpdateForm: boolean,
    openModal: boolean,
}

class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {
    constructor(props: ICreateCategoryProps) {
        super(props);

        this.state = {
            categories: null,
            categoryKey: null,
            hideUpdateForm: true,
            openModal: false,
        };
    }

    async componentDidMount(){
        const localS = new LocalStorage();

        const getValue: any  = await localS.getValue('categories');

        if(!getValue){
            return;
        }

        const categories = getValue.value;

        this.setState({
            categories
        });
    }

    handleClickUpdate = (categoryKey: any) => {
        if(categoryKey){
            this.setState({
                categoryKey,
                hideUpdateForm: false,
            });
        }
    }

    handleSaveCategory = (categories: any, hideUpdateForm: boolean) => {
        if(!categories){
            this.setState({hideUpdateForm});
        }
        else {
            this.setState({
                categories,
                hideUpdateForm
            });
        }
    } 

    handleClickDelete = async (categoryKey: any) => {
        this.setState({
            categoryKey: categoryKey,
            openModal: true
        })
        // const localS = new LocalStorage();

        // const {categories} = this.state;
        // console.log(categories);
        // let newCategories = categories.filter((category: any) => {
        //     return category.key !== categoryKey;
        // });

        // console.log(newCategories);

        // if(!newCategories.length){
        //     newCategories = null;
        // }

        // await localS.setValue('categories', newCategories);

        // this.setState({
        //     categories: newCategories,
        //     categoryKey: null,
        //     hideUpdateForm: true,
        // });
    }

    handleDeleteCategory = (categories: any) => {
        this.setState({
            openModal: false,
            categories
        });
    }

    render() {
        const columns = [
            {
                title: "Category Name",
                dataIndex: "name",
            },
            {
                title: "Category Code",
                dataIndex: "code",
            },
            {
                title: "Category Note",
                dataIndex: "note",
            },
            {
                title: "Action",
                dataIndex: "action",
                render: (text:any, row:any, index:any) => {
                    return (
                        <div>
                            <Button onClick={() => this.handleClickUpdate(row.key)}>Update - {row.key}</Button>
                            -
                            <Button onClick={() => this.handleClickDelete(row.key)}>Delete - {row.key}</Button>
                        </div>
                    );
                },
            },
        ];

        const {categories} = this.state;
        
        
        return (
            <div id="create-category">
                <div className="search-result-categories">
                    <FormCreateCategory 
                        setCategories = { (categories: any) => {
                            this.setState({categories})
                        }}

                        hideCreateForm={!this.state.hideUpdateForm}
                    />

                    <FormUpdateCategory 
                        saveCategory = {(categories: number, hideUpdateForm: boolean) => this.handleSaveCategory(categories, hideUpdateForm)}

                        setHideUpdateForm = {(hideUpdateForm: boolean) => {
                            this.setState({hideUpdateForm})
                        }}

                        categories = {this.state.categories}

                        categoryKey = {this.state.categoryKey}

                        hideUpdateForm = {this.state.hideUpdateForm}
                    />

                    <ModalDeleteCategory 
                        openModal = { this.state.openModal }

                        categoryKey = { this.state.categoryKey }

                        categories = { this.state.categories }

                        closeModal = {(openModal: boolean) => {this.setState({openModal: !openModal})}}

                        deleteCategory = {(categories: any) => {this.handleDeleteCategory(categories)}}
                    />
                   
                    { categories ?
                        <Table pagination={false} columns={columns} dataSource={categories} rowKey="key"/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

// const CreateCategoryForm = Form.create({ name: 'create_category_form' })(CreateCategory);

// const mapStateToProps = (state: AppState, ownProps: OwnProps): StateProps => ({
//     // categories: state.categories.createMultiCategory,
// });

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps): DispatchProps => ({
    createMultiCategory: (categories) => dispatch(createMultiCategory(categories)),
});

export default connect(
    null,
    mapDispatchToProps
)(CreateCategory);
