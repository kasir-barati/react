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
 * @returns
 */
export default function Board(props) {
    const { id, age, name, onClickIncreaseAge } = props;
    return (
        <div onClick={() => onClickIncreaseAge(id)}>
            I'm {name} and {age} years old.
        </div>
    );
}
