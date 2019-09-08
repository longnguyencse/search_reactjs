import React from 'react';
import {Route} from 'react-router-dom';
import Create from './create';

import "./styles.scss";


interface IProductProps {

}

interface IProductState {

}

export default class ProductClass extends React.Component<IProductProps, IProductState> {
    constructor(props: IProductProps) {
        super(props);
    }

    render() {
        return (
            <div id="product-class">
                <Route exact path="/classes/create" component={Create}/>
            </div>
        );
    }
}
