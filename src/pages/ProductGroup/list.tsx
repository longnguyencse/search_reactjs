import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from "antd";


interface IProps {

}

interface IState {

}

class List extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div id="group-list" className="page-list">
                <div className="page-list-header">
                    <h1 className="page-list-title">Group List</h1>
                    <div className="button-group">
                        <Button type="primary" className="btn-add-new">
                            <Link to="/groups/create">Add New</Link>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;
