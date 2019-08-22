import React from 'react';
import {Empty} from 'antd';

interface IDiscountListProps {

}

interface IDiscountListStates {

}

class Logout extends React.Component<IDiscountListProps, IDiscountListStates> {
    constructor(props: IDiscountListProps) {
        super(props);
    }

    render() {
        return (
            <Empty/>
        );
    }
}

export default Logout;
