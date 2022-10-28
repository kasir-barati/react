// @ts-check
import React, { Component } from 'react';

import Persons from '../../Component/Persons/Persons';
import appClasses from './AppClass.module.css';

/**
 * @typedef Person
 * @type {import("../../Component/Person/person").PersonType}
 */
export default class App extends Component {
    constructor(props) {
        console.log('[AppClass.js] constructor');
        super(props);
    }

    static getDerivedStateFromProps(props, state) {
        console.log('[AppClass.js] getDerivedStateFromProps');
        console.dir(props, { depth: null });
        console.log(state);

        return state;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[AppClass.js] shouldComponentUpdate');
        console.dir(nextProps, { depth: null });
        console.log(nextState);

        return nextState;
    }

    render() {
        console.log('[AppClass.js] render');

        return (
            <Persons
                onChangeReplaceName={this.changeNameHandler}
                onClickDeletePerson={this.deletePersonHandler}
                onClickIncreaseAge={this.increaseAgeHandler}
                persons={this.state.persons}
            ></Persons>
        );
    }

    getSnapshotBeforeUpdate(previousProps, previousState) {
        console.log('[AppClass.js] getSnapshotBeforeUpdate');
        console.dir(previousProps, { depth: null });
        console.log(previousState);

        return previousState;
    }

    componentDidUpdate() {
        console.log('[AppClass.js] componentDidUpdate');
    }

    componentDidMount() {
        console.log('[AppClass.js] componentDidMount');
    }

    /**@type {{persons: Person[]}} */
    state = {
        persons: [
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
        ],
    };

    /**
     *
     * @param {string} id
     */
    increaseAgeHandler = (id) => {
        const personIndex = this.state.persons.findIndex(
            (person) => person.id === id,
        );
        const persons = structuredClone(this.state.persons);
        persons[personIndex].age++;
        this.setState({ persons });
    };

    /**
     *
     * @param {string} id
     */
    deletePersonHandler = (id) => {
        /**@type {Person[]} */
        const persons = structuredClone(this.state.persons);
        const personIndex = this.state.persons.findIndex(
            (person) => person.id === id,
        );

        persons.splice(personIndex, 1);
        this.setState({ persons });
    };

    /**
     *
     * @param {string} id
     * @param {string} newName
     */
    changeNameHandler = (id, newName) => {
        const personIndex = this.state.persons.findIndex(
            (person) => person.id === id,
        );
        const persons = structuredClone(this.state.persons);
        persons[personIndex].name = newName;
        this.setState({ persons });
    };
}
