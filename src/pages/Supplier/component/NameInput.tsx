import React from 'react';


interface IProps {

}

interface IState {

}

class NameInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div id="name-supplier">
                <p>Hello</p>
            </div>
        );
    }
}

export default NameInput;
