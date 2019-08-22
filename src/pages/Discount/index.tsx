import React from 'react';
import {Route} from "react-router";
import ListDiscount from "./list";
import CreateDiscount from "./create";

interface IDiscountProps {

}

interface IDiscountStates {

}

class DisCount extends React.Component<IDiscountProps, IDiscountStates> {
    constructor(props: IDiscountProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <Route exact path="/create/discount" component={CreateDiscount}/>
                <Route exact path="/discounts" component={ListDiscount}/>
            </div>
        );
    }
}

export default DisCount;
