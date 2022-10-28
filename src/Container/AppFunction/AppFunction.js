// @ts-check

import React, { useState } from 'react';

import appClasses from './AppFunction.module.css';
import Persons from '../../Component/Persons/Persons';

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

    return (
        <Persons
            persons={personsState}
            onChangeReplaceName={changeNameHandler}
            onClickDeletePerson={deletePersonHandler}
            onClickIncreaseAge={increaseAgeHandler}
        ></Persons>
    );

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
