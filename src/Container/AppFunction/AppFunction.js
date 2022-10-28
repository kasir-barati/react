// @ts-check

import React, { useState } from 'react';

import appClasses from './AppFunction.module.css';
import Person from '../../Component/Person/Person';

/**
 * @typedef Person
 * @type {Object}
 * @property {string} id
 * @property {string} name
 * @property {number} age
 *
 * @param {Object} props
 * @param {Person[]} props.persons
 */
export default function AppFunction(props) {
    /**@type {Person[]} */
    const persons = [
        {
            id: '13',
            name: 'Kasir',
            age: 27,
        },
    ];
    /**@type {[Person[], Function]} */
    const [personsState, setPersonsState] = useState(persons);
    /**@type {[boolean, Function]} */
    const [showPersonsState, setShowPersonsState] = useState(true);

    return (
        <>
            {generatePersonsContainer()}
            <div className={appClasses.togglePerson}>
                <button onClick={togglePersonsHandler}>
                    Toggle persons
                </button>
            </div>
        </>
    );

    function generatePersonsContainer() {
        if (showPersonsState) {
            return (
                <div>
                    {personsState.map(({ id, name, age }) => (
                        <>
                            <Person
                                id={id}
                                key={id}
                                name={name}
                                age={age}
                                onClickIncreaseAge={
                                    increaseAgeHandler
                                }
                                onChangeReplaceName={
                                    changeNameHandler
                                }
                            >
                                <button
                                    onClick={() =>
                                        increaseAgeHandler(id)
                                    }
                                >
                                    Increase age
                                </button>
                            </Person>
                        </>
                    ))}
                </div>
            );
        }
    }

    /**
     *
     * @param {string} id
     */
    function increaseAgeHandler(id) {
        const personIndex = personsState.findIndex(
            (person) => person.id === id,
        );
        const persons = structuredClone(personsState);
        persons[personIndex].age++;
        setPersonsState(persons);
    }

    function changeNameHandler(id, newName) {
        const personIndex = personsState.findIndex(
            (person) => person.id === id,
        );
        /**@type {Person[]} */
        const persons = structuredClone(personsState);
        persons[personIndex].name = newName;
        setPersonsState(persons);
    }

    function togglePersonsHandler() {
        setShowPersonsState(!showPersonsState);
    }
}
