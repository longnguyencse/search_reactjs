import React from "react";
import {Link} from 'react-router-dom';

export default class List extends React.Component<IListProps, IListState> {
    constructor(props: IListProps){
        super(props);

        this.state = {
            names: ['A', 'B', 'C', 'D']
        };
    }

    render(){
        return (
            <ul className="list-group">
                {this.state.names.map((name, index) => {
                    console.log(index)
                    return <li key={index} className="list-group-item">
                        <Link to={`po/${name}`}>{name}</Link>
                    </li>
                })}
            </ul>
        );
    }
};

interface IListProps {

}

interface IListState {
    names: Array<string>
}
