import React from "react";

import {Route} from 'react-router-dom';

import List from './list';
import CreateProductOrder from "./create";

import './styles.scss';

export default class ProductOrder extends React.Component<IProductOrderProps, IProductOrderState> {
    constructor(props: IProductOrderProps){
        super(props);
    }

    render(){
        return (
            <div id="product-order">
                <Route exact path="/" component={List} />
                <Route exact path="/po" component={List} />
                <Route exact path="/po/create" component={CreateProductOrder}/>
            </div>
        );
    }
};

interface IProductOrderProps {

}

interface IProductOrderState {
}
