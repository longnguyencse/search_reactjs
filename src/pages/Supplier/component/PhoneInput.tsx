import React from 'react';


interface IProps {

}

interface IState {

}

class PhoneInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div id="phone-supplier">
                <p>Hello</p>
            </div>
        );
    }
}

export default PhoneInput;
