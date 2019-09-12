import React from "react";
import {Empty} from 'antd';

import FormCreate from './components/FormCreate';

interface OwnProps {

}

interface StateProps {

}

interface DispatchProps {

}

type IProps = OwnProps & StateProps & DispatchProps;

interface IState {

}

class CreateProductOrder extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <FormCreate />
            // <Empty/>
        );
    }
}

export default CreateProductOrder;
