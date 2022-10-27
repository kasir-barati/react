// @ts-check
import React, { Component } from 'react';

import Person from '../../Component/Person/Person';
import './AppClass.css';

export default class App extends Component {
    state = {
        persons: [
            {
                id: '13',
                name: 'Kasir',
                age: 27,
            },
        ],
    };

    /**
     *
     * @param {string} id
     */
    increaseAge(id) {
        const personIndex = this.state.persons.findIndex(
            (person) => person.id === id,
        );
        const persons = structuredClone(this.state.persons);
        persons[personIndex].age++;
        this.setState({ persons });
    }

    render() {
        return (
            <div>
                {this.state.persons.map(({ id, name, age }) => (
                    <>
                        <Person
                            id={id}
                            key={id}
                            name={name}
                            age={age}
                            increaseAgeHandler={this.increaseAge}
                        >
                            <p>
                                This is a children tag inside the
                                Person component.
                            </p>
                        </Person>
                        <button onClick={() => this.increaseAge(id)}>
                            Increase age
                        </button>
                    </>
                ))}
            </div>
        );
    }
}
