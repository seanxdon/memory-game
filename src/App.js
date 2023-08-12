import { useState, useEffect } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import shuffle from './utilities/shuffle';

function App() {
  const [cards, setCards] = useState(shuffle); // Get Cards Array from Assets
  const [pickOne, setPickOne] = useState(null); // Set First Selection
  const [pickTwo, setPickTwo] = useState(null); // Set Second Selection
  const [disabled, setDisabled] = useState(false); // Set Disabled Board Handler
  const [wins, setWins] = useState(0); // Set Win Streak

  const handleClick = (card) => {
    if (!disabled) {
      pickOne ? setPickTwo(card) : setPickOne(card);
    }
  };

  const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
  };

  const handleNewGame = () => {
    setWins(0);
    handleTurn();
    setCards(shuffle);
  }
  // Used for selection and match handling 
  useEffect(() => {
    let pickTimer; 

    // Two cards have been selected
    if (pickOne && pickTwo) {
      // If the cards are a match
      if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            // Update Card property to reflect match
            if (card.image === pickOne.image) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        handleTurn();
      } else {
        // Prevent new Selections after Delay
        setDisabled(true);

        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, pickOne, pickTwo, wins]);
  // ^ This effect will run on any changes to these values



  // Use if player found all matches
  useEffect(() => {
    // Check if the remaining cards are matched
    const checkWin = cards.filter((cards) => !cards.matched);

    // Handle all matches made
    if (cards.length && checkWin.length < 1) {
      console.log("You Win!")
      setWins(wins + 1);
      handleTurn();
      setCards(shuffle);
    }
  }, [cards, wins])

  return (
    <>
    
      <Header handleNewGame={handleNewGame} wins={wins} />

      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          
          return (
            <Card
              key={id}
              image={image}
              selected={card === pickOne || card === pickTwo || matched}
              onClick={() => handleClick(card)} // try to break this later and remove the anon function and argument
            />
          );
        })}
      </div>

    </>
  );
}

export default App;
