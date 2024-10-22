import { useState } from 'react';

function Game() {
  const [card, setCard] = useState(null);
  const [goldCardCount, setGoldCardCount] = useState(0);
  const [round, setRound] = useState(1);

  // Calculate what you can during rendering
  const isGameOver = round > 5;

  function handlePlaceCard(nextCard) {
    if (isGameOver) {
      throw Error('Game already ended.');
    }

    // Calculate all the next state in the event handler
    setCard(nextCard);
    if (!nextCard.gold) {
      return;
    }

    if (goldCardCount <= 3) {
      setGoldCardCount(goldCardCount + 1);
      return;
    }

    setGoldCardCount(0);
    setRound(round + 1);

    if (round === 5) {
      alert('Good game!');
    }
  }

  // ...
}
