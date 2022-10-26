// @ts-check

import React from 'react';
// Module not found: Error: Can't resolve 'prop-types' in '/home/kasir/my-react-journey/src/components/Square'
// import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.name
 * @param {number} props.age
 * @param {any} props.onClickIncreaseAge
 * @param {any} props.children
 * @returns
 */
export default function Person(props) {
    const { id, age, name, onClickIncreaseAge, children } = props;

    return (
        <div onClick={() => onClickIncreaseAge(id)}>
            I'm {name} and {age} years old.
            <br />
            {children}
        </div>
    );
}
