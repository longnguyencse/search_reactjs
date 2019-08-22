import React from 'react';

import CreateSupplierForm from './create';

import {Route} from 'react-router-dom';
import ListSupplier from "./list";

interface IProductProps {

}

interface IProductState {

}

class Supplier extends React.Component <IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);
    }

    render() {
        return (
            <div id="supplier">
                <Route exact path="/supplier/create" component={CreateSupplierForm}/>
                <Route exact path="/suppliers" component={ListSupplier}/>
            </div>
        );
    }
}

export default Supplier;
