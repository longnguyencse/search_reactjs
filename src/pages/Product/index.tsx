import React from 'react';

import CreateProductForm from './create';

import {Route} from 'react-router-dom';

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
                <Route path="/product/create" component={CreateProductForm}></Route>
            </div>
        );
    }
}