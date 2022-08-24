// @ts-check
import React, { Fragment, useEffect, useState } from 'react';
// Module not found: Error: Can't resolve 'prop-types' in '/home/kasir/my-react-journey/src/components/Square'
// import PropTypes from 'prop-types';
import { determineWinner } from './DetermineWinner';
import './Board.css';
import Square from '../Square/Square';

const Board = () => {
    const [isX, setIsX] = useState(true);
    const [squares, setSquares] = useState(new Array(9).fill(''));

    // Handle block case
    useEffect(() => {
        const emptySquares = squares.filter(
            (square) => square.length === 0,
        );

        if (emptySquares.length === 0) {
            setTimeout(() => {
                alert('No one win');
                setSquares(new Array(9).fill(''));
            }, 0);
        }
    });

    // Handle winner case
    useEffect(() => {
        const result = determineWinner(squares);

        if (typeof result === 'string') {
            setTimeout(() => {
                alert(`${result} won`);
                setSquares(new Array(9).fill(''));
            }, 0);
        }
    });
    /**
     *
     * @param {string} square
     * @param {number} index
     */
    function renderSquare(square, index) {
        return (
            <Square
                key={index}
                value={square}
                handleClick={() => {
                    /**
                     * Why spread operator? https://stackoverflow.com/a/71185523/8784518
                     * Immutability
                     * 2 approaches to changing data:
                     *   1. The first approach is to mutate the data by directly changing the data’s values.
                     *   2. The second approach is to replace the data with a new copy which has the desired changes.
                     */
                    const newSquares = [...squares];

                    newSquares[index] = isX ? 'X' : 'O';
                    setIsX(!isX);
                    setSquares(newSquares);
                }}
            />
        );
    }

    return (
        <div className="Board">
            {squares.map((square, index) => (
                <Fragment>
                    {renderSquare(square, index)}
                    {(index + 1) % 3 === 0 && <br />}
                </Fragment>
            ))}
        </div>
    );
};

Board.propTypes = {};

Board.defaultProps = {};

export default Board;
