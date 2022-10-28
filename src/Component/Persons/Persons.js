// @ts-check

import React, { useState } from 'react';

import personsClasses from './Persons.module.css';
import Person from '../../Component/Person/Person';
import ErrorBoundaryClass from '../ErrorBoundary/ErrorBoundaryClass';

/**
 * @typedef Person
 * @type {import('../Person/person').PersonType}
 *
 *
 * @param {object} props
 * @param {Person[]} props.persons
 * @param {Function} props.onClickIncreaseAge
 * @param {Function} props.onChangeReplaceName
 * @param {Function} props.onClickDeletePerson
 */
export default function Persons(props) {
    const {
        persons,
        onClickDeletePerson,
        onChangeReplaceName,
        onClickIncreaseAge,
    } = props;
    /**@type {[boolean, Function]} */
    const [showPersonsState, setShowPersonsState] = useState(true);

    function togglePersonsHandler() {
        setShowPersonsState(!showPersonsState);
    }

    return (
        <>
            {generatePersonsContainer()}
            <div className={personsClasses.togglePerson}>
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
                    {persons.map((person) => (
                        <ErrorBoundaryClass key={person.id}>
                            <Person
                                person={person}
                                onClickIncreaseAge={
                                    onClickIncreaseAge
                                }
                                onChangeReplaceName={
                                    onChangeReplaceName
                                }
                            >
                                <button
                                    onClick={() =>
                                        onClickIncreaseAge(person.id)
                                    }
                                >
                                    Increase age
                                </button>
                                <button
                                    onClick={() =>
                                        onClickDeletePerson(person.id)
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
}
