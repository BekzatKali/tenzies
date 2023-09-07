import React from 'react';
import { useState } from 'react'
import './App.css'
import Die from './Die'
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

function App() {
  const allNewDice = () => {
    let array = [];
    for (let i = 1; i <= 10; i++) {
      const num = {
        value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false,
        id: nanoid()
      };
      array.push(num)
    }
    return array;
  }

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numberOfRolls, setNumberOfRolls] = useState(0);
  const [time, setTime] = useState(0);
  

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value;
      const allTheSame = dice.every(die => die.value === firstValue)
      if (allHeld && allTheSame) {
        setTenzies(true)
        setIsGameActive(false);
        console.log("You won")
      }
      
    }, [dice])
    
    function newGeneration() {
      return {
        value: Math.floor(Math.random() * 6) + 1, 
        isHeld: false,
        id: nanoid()
      }
    }
    
    function rollDice() {
    setNumberOfRolls(prevItem => prevItem + 1)
    

    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : newGeneration()
      }))
    } else {
      setTenzies(false);
      setDice(allNewDice())
    }
    
    }
    console.log(numberOfRolls)
    function holdDice(id) {
      setDice(oldDice => oldDice.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }))
    }

    const holder = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>)

    return (
      
      <main className='main'>
        {tenzies && <Confetti />}
        <div className='app'>
          <div className='app-content'>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='btn-wrapper'>
                {holder}
            </div>
            <button onClick={rollDice} className='roll'>{tenzies ? "New Game" : "Roll"}</button>
          </div>
        </div>
      </main>
    )
}

export default App
