// @ts-check
import React, { Component } from 'react';

export default class ErrorBoundaryClass extends Component {
    state = {
        hasError: false,
        errorMessages: [],
    };

    componentDidCatch = (error, info) => {
        this.setState({ hasError: true, errorMessages: [error] });
    };

    render() {
        if (this.state.hasError) {
            return this.state.errorMessages.map((errorMessage) => (
                <h1>{errorMessage}</h1>
            ));
        }

        return this.props.children;
    }
}
