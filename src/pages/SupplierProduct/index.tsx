import React from 'react';

import CreateSupplierProductForm from './create';

import {Route} from 'react-router-dom';

// import List from "../ProductOrder/list";

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
            <div id="supplier-products">
                <Route exact path="/supplier_products/create" component={CreateSupplierProductForm}/>
            </div>
        );
    }
}
