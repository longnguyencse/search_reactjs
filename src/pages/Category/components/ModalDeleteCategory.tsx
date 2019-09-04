import React from 'react';

import {Modal} from 'antd';


import LocalStorage from '../../../services/LocalStorage';

interface OwnProps {
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
}


class ModalDeleteCategory extends React.Component<IModalDeleteCategoryProps, IModalDeleteCategoryState> {
    constructor(props: IModalDeleteCategoryProps) {
        super(props);

        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        };

        console.log(props)
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
    handleOk = () => {
        this.setState({
            ModalText: 'The modal will be closed after two seconds',
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
            visible: false,
            confirmLoading: false,
            });
        }, 2000);
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    render() {
        const { visible, confirmLoading, ModalText } = this.state;
        
        return (
            <Modal
                title="Title"
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
