import React from "react";

import {RouteComponentProps} from 'react-router-dom';

export default class Detail extends React.Component<IDetailProps, IListState> {
    constructor(props: IDetailProps){
        super(props);

        this.state = {
            name: this.props.match.params.name
        }
    }

    render(){
        return (
            <h1>{this.state.name}</h1>
        );
    }
};

interface IDetailProps extends RouteComponentProps<{name: string}>{

}

interface IListState {
    name: string
}
