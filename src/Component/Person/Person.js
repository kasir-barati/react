// @ts-check

import React from 'react';

import personClasses from './Person.module.css';
// Module not found: Error: Can't resolve 'prop-types' in '/home/kasir/my-react-journey/src/components/Square'
// import PropTypes from 'prop-types';

/**
 * @typedef Person
 * @type {import("./person").PersonType}
 *
 * @param {object} props
 * @param {Person} props.person
 * @param {any} props.onClickIncreaseAge
 * @param {any} props.onChangeReplaceName
 * @param {any} props.children
 * @returns
 */
export default function Person(props) {
    const {
        person,
        onClickIncreaseAge,
        onChangeReplaceName,
        children,
    } = props;
    const { age, id, name } = person;

    // if (Math.ceil(Math.random() * 1000) % 2 === 0) {
    //     throw 'Error';
    // }

    return (
        <div className={personClasses.person}>
            <p onClick={() => onClickIncreaseAge(id)}>
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
