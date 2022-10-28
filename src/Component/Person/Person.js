// @ts-check

import React from 'react';

import personClasses from './Person.module.css';
// Module not found: Error: Can't resolve 'prop-types' in '/home/kasir/my-react-journey/src/components/Square'
// import PropTypes from 'prop-types';

/**
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.name
 * @param {number} props.age
 * @param {any} props.onClickIncreaseAge
 * @param {any} props.onChangeReplaceName
 * @param {any} props.children
 * @returns
 */
export default function Person(props) {
    const {
        id,
        age,
        name,
        onClickIncreaseAge,
        onChangeReplaceName,
        children,
    } = props;

    return (
        <div
            className={personClasses.person}
            onClick={() => onClickIncreaseAge(id)}
        >
            <p>
                I'm {name} and {age} years old.
            </p>
            {children}
            <div>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    id="name"
                    onChange={(element) =>
                        onChangeReplaceName(id, element.target.value)
                    }
                    className={personClasses.name}
                />
            </div>
        </div>
    );
}
