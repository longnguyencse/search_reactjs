import React from 'react';

interface OwnProps {

}

interface DispatchProps {

}

interface StateProps {

}

type ListCategoryProps = OwnProps & DispatchProps & StateProps;

export default class List extends React.Component<ListCategoryProps> {
    constructor(props: ListCategoryProps){
        super(props);
    }

    render(){
        return <h1>Oke</h1>
    }
}