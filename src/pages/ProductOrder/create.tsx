import React from "react";
import {Empty} from 'antd';

interface ICreatePoProps {

}

interface ICreatePoStates {

}

class CreateProductOrder extends React.Component<ICreatePoProps, ICreatePoStates> {
    constructor(props: ICreatePoProps) {
        super(props);
    }

    render() {
        return (
            <Empty/>
        );
    }
}

export default CreateProductOrder;
