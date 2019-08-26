import React from 'react';

import CreateProductForm from './create';

import {Route} from 'react-router-dom';
import List from "../ProductOrder/list";

interface IProductProps {

}

interface IProductState {

}

export default class Product extends React.Component <IProductProps, IProductState> {
    constructor(props: IProductProps){
        super(props);
    }

    render(){
        return (
            <div id="product">
                <Route exact path="/products" component={List}/>
                <Route exact path="/products/create" component={CreateProductForm}/>
            </div>
        );
    }
}
