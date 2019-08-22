import React from 'react';

import CreateSupplierForm from './create';

import {Route} from 'react-router-dom';

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
                <Route path="/supplier/create" component={CreateSupplierForm}/>
            </div>
        );
    }
}

export default Supplier;
