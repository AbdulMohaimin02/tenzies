import './App.css';
import Die from './Die';
import React from 'react';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [objArray,setObjArray] = React.useState(allNewDice())
  const [tenzies,setTenzies] = React.useState(false)

	React.useEffect(() => {

		if(
        objArray.every(die => die.isHeld) && 
        objArray.every(die => die.value === objArray[0].value)
    ){
      setTenzies(true)
			winner()
		}

	},[objArray])
  


  function winner(){
    console.log("congrats you have won the game")
  }

  function newDie(){
    let x = Math.floor((Math.random() * 6) + 1);
    let obj = {
      value: x,
      isHeld: false,
      id: nanoid()
    }
    return obj
  }


  function reroll(){

    if(tenzies) {
      setObjArray(allNewDice())
      setTenzies(false)
    } else {
      setObjArray(prevState => {
        const newArray = []
        for (var i =0; i<prevState.length; i++){
          if (prevState[i].isHeld === true){
            newArray.push(prevState[i])
          } else {
            newArray.push(newDie())
          }
  
        }
        return newArray
      })
    }
    
  }


  function holdDice(id){
    setObjArray(prevState => {
      const newArray = []
      for (var i =0; i<prevState.length; i++){
        if (prevState[i].id === id){

          const newObj= {
            ...prevState[i],
            isHeld : !prevState[i].isHeld
          }

          newArray.push(newObj)

        } else {
          newArray.push(prevState[i])
        }

      }
      return newArray
    })

  }


  function allNewDice(){
    let array = []
    for(var i =0; i<10;i++){
      array.push(newDie())
    }
    return array
  }

  const dice = objArray.map(obj => {
    return(
      <Die
        value = {obj.value}
        isHeld = {obj.isHeld}
        id = {obj.id}
        key={obj.id}
        hold = {holdDice}
      />
    )
  })

  return (

    <div className="container">
      
      <main>

        {tenzies && <Confetti/>}

        <div className='info'>
          <h1 className="title">Tenzies</h1>
          <h3 className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</h3>
        </div>
        
        <div className="main-content">
          {dice}
          <button className="reroll" onClick={reroll}>{tenzies? "New Game" : "Roll"}</button>
        </div>
        

      </main>
    </div>
    
  ); 
}

export default App;
