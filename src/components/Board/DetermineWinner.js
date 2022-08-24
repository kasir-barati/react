// @ts-check

/**
 *
 * @param {string[]} squares
 * @returns {string | void}
 */
export function determineWinner(squares) {
    const winningScenarios = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const winningScenario of winningScenarios) {
        const [indexA, indexB, indexC] = winningScenario;

        if (
            squares[indexA] !== '' &&
            squares[indexA] === squares[indexB] &&
            squares[indexA] === squares[indexC]
        ) {
            return squares[indexA];
        }
    }
}
