import React from "react";

import {Route} from 'react-router-dom';

import List from './list';
import Detail from './detail';
import CreateProductOrder from "./create";

export default class ProductOrder extends React.Component<IProductOrderProps, IProductOrderState> {
    constructor(props: IProductOrderProps){
        super(props);
    }

    render(){
        return (
            <div>
                <Route exact path="/" component={List} />
                <Route exact path="/po" component={List} />
                <Route exact path="/create/po" component={CreateProductOrder}/>
                <Route exact path="/po/:name" component={Detail} />
            </div>
        );
    }
};

interface IProductOrderProps {

}

interface IProductOrderState {
}
