import React from 'react';

import {Route} from 'react-router-dom';

import CreateCategoryForm from './create';
import List from "./list";


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
            <div id="category">
                {/* <Route exact path="/products" component={List}/> */}
                <Route exact path="/categories/create" component={CreateCategoryForm}/>
            </div>
        );
    }
}
