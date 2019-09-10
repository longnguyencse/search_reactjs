import React from 'react';


interface IProps {

}

interface IState {

}

class CodeInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div id="code-supplier">
                <p>Hello</p>
            </div>
        );
    }
}

export default CodeInput;
