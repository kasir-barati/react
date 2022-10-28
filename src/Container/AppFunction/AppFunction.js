// @ts-check

import React, { useState } from 'react';

import appClasses from './AppFunction.module.css';
import Person from '../../Component/Person/Person';
import ErrorBoundaryClass from '../../Component/ErrorBoundary/ErrorBoundaryClass';

/**
 * @typedef Person
 * @type {import("../../Component/Person/person").PersonType}
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
        {
            id: '7',
            name: 'Mohammad Jawad',
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
                    {personsState.map((person) => (
                        <ErrorBoundaryClass key={person.id}>
                            <Person
                                person={person}
                                onClickIncreaseAge={
                                    increaseAgeHandler
                                }
                                onChangeReplaceName={
                                    changeNameHandler
                                }
                            >
                                <button
                                    onClick={() =>
                                        increaseAgeHandler(person.id)
                                    }
                                >
                                    Increase age
                                </button>
                                <button
                                    onClick={() =>
                                        deletePersonHandler(person.id)
                                    }
                                >
                                    Delete person
                                </button>
                            </Person>
                        </ErrorBoundaryClass>
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

    /**
     * @param {string} id
     */
    function deletePersonHandler(id) {
        /**@type {Person[]} */
        const persons = structuredClone(personsState);
        const personIndex = personsState.findIndex(
            (person) => person.id === id,
        );

        persons.splice(personIndex, 1);
        setPersonsState(persons);
    }
}
