// @ts-check
import React from 'react';
// Module not found: Error: Can't resolve 'prop-types' in '/home/kasir/my-react-journey/src/components/Square'
// import PropTypes from 'prop-types';

import style from './Square.module.css';

/**
 * The DOM <button> element’s onClick attribute has a special meaning to React because it is a built-in component. For custom components like Square, the naming is up to you. We could give any name to the Square’s onClick prop or Board’s handleClick method, and the code would work the same. In React, it’s conventional to use on[Event] names for props which represent events and handle[Event] for the methods which handle the events.
 * @param {{value: any, handleClick: any}} props
 * @returns
 */
const Square = (props) => {
    return (
        <button className={style.Square} onClick={props.handleClick}>
            {props.value}
        </button>
    );
};

Square.propTypes = {};

Square.defaultProps = {};

export default Square;
