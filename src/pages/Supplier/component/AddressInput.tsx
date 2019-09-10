import React from 'react';


interface IProps {

}

interface IState {

}

class AddressInput extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <div id="address-supplier">
                <p>Hello</p>
            </div>
        );
    }
}

export default AddressInput;
