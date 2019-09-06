import React from 'react';

import {Modal} from 'antd';


import LocalStorage from '../../../services/LocalStorage';

interface OwnProps {
    openDeleteModal: boolean,
    categoryKey: number,
    categories: any,
    closeModal: (openDeleteModal: boolean) => void,
    deleteCategory: (categories: any) => void
}

interface StateProps {
}

interface DispatchProps {
}

type IModalDeleteCategoryProps = OwnProps & StateProps & DispatchProps;

interface IModalDeleteCategoryState {
    ModalText: string,
    visible: boolean,
    confirmLoading: boolean,
    categoryKey: number | null,
    categories: any
}


class ModalDeleteCategory extends React.Component<IModalDeleteCategoryProps, IModalDeleteCategoryState> {
    constructor(props: IModalDeleteCategoryProps) {
        super(props);

        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
            categoryKey: null,
            categories: null
        };

    }

    componentWillReceiveProps(newProps: any){
        const categories = newProps.categories ? newProps.categories : [];
        const categoryKey = newProps.categoryKey ? newProps.categoryKey : null;
        const openDeleteModal = newProps.openDeleteModal;

        if(!newProps.categoryKey){
            return;
        }

        const findCategory = categories.find((category: any) => {
            return category.key === categoryKey;
        })

        let modalText = "";
        if(findCategory){
            modalText = `Bạn có chắc muốn xóa Category: ${findCategory.name}`;
        }

        this.setState({
            ModalText: modalText,
            visible: openDeleteModal,
            categories,
            categoryKey
        });

        
    }

    // showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };
    
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(async () => {
            // this.setState({
            // visible: false,
            // confirmLoading: false,
            // });

            const localS = new LocalStorage();

            const {categories, categoryKey} = this.state;

            let newCategories = categories.filter((category: any) => {
                return category.key !== categoryKey;
            });

            console.log(categoryKey);

            if(!newCategories.length){
                newCategories = null;
            }

            await localS.setValue('categories', newCategories);

            this.props.deleteCategory(newCategories);

            this.setState({
                visible: false,
                confirmLoading: false,
            });

        }, 500);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.props.closeModal(true);
        // this.setState({
        //     visible: false,
        // });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        
        return (
            <Modal
                title="Xóa Category"
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}
            >
                <p>{ModalText}</p>
             </Modal>
        );
    }
}

export default ModalDeleteCategory;
