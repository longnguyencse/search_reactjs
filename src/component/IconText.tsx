import * as React from 'react';
import {Icon} from "antd";

interface Props {
    text: any,
}

export class IconText extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <span>
            <Icon style={{marginRight: 8}}/>
                {this.props.text}
        </span>
        );
    }
}
