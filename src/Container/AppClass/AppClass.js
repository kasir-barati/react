// @ts-check
import React, { Component } from 'react';

import Person from '../../Component/Person/Person';
import appClasses from './AppClass.module.css';

export default class App extends Component {
    state = {
        persons: [
            {
                id: '13',
                name: 'Kasir',
                age: 27,
            },
        ],
        showPersons: true,
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

    generatePersonsContainer = () => {
        if (this.state.showPersons) {
            return (
                <div>
                    {this.state.persons.map(({ id, name, age }) => (
                        <>
                            <Person
                                id={id}
                                key={id}
                                name={name}
                                age={age}
                                onClickIncreaseAge={
                                    this.increaseAgeHandler
                                }
                                onChangeReplaceName={
                                    this.changeNameHandler
                                }
                            >
                                <button
                                    onClick={() =>
                                        this.increaseAgeHandler(id)
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

    togglePersonsHandler = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    render() {
        return (
            <>
                {this.generatePersonsContainer()}
                <div className={appClasses.togglePerson}>
                    <button onClick={this.togglePersonsHandler}>
                        Toggle persons
                    </button>
                </div>
            </>
        );
    }
}
