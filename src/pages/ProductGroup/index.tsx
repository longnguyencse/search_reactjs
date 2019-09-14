import React from 'react';

import {Route} from 'react-router-dom';
import Create from './create';

import "./styles.scss";
import List from "./list";


interface IProductProps {

}

interface IProductState {

}

export default class ProductGroup extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);
    }

    render() {
        return (
            <div id="product-group">
                <Route exact path="/groups/create" component={Create}/>
                <Route exact path="/groups" component={List}/>
            </div>
        );
    }
}
