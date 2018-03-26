import React, { Component } from 'react';
import {Div} from "glamorous";

export default class EyeTrackingDebugger extends Component {

    render() {
        let {
            x,
            y
        } = this.props;
        return (
            <div key={'eyeTrackerDebugger'}>
                <Div
                    key={'pointer'}
                    position={'fixed'}
                    zIndex={99999}
                    left={'-5px'}
                    top={'-5px'}
                    width={'10px'}
                    height={'10px'}
                    background={'red'}
                    display={'block'}
                    borderRadius={'100%'}
                    opacity={0.7}
                    transform={`translate(${x}px,${y}px)`}
                />
            </div>
        );
    }

}