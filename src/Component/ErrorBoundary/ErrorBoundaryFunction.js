// @ts-check
import React, { Component, useState } from 'react';

/**
 *
 * @param {object} props
 * @param {any} props.children
 * @returns
 */
export default function ErrorBoundary(props) {
    const { children } = props;
    /**@type {[string[], Function]} */
    const [errorMessagesState, setErrorMessagesState] = useState([]);
    /**@type {[boolean, Function]} */
    const [hasErrorState, setHasErrorState] = useState(false);

    return hasErrorState
        ? errorMessagesState.map((errorMessage) => {
              return <h1>{errorMessage}</h1>;
          })
        : children;
}
