import React, { Fragment } from 'react';

function FunctionRenderer(props) {
    if (typeof props.children === 'function') {
        return (
            <Fragment>
                {props.children()}
            </Fragment>
        )
    } else {
        throw new Error('Children of FunctionRenderer should be function!')
    }
}

export default FunctionRenderer;