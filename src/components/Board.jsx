import React, {  useState } from 'react'
import "../App.css"
import Card from "./Card"
import {  faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddTask from './AddTask'
function Board(props) {
    var board_name=props.board_name
    var color= props.color
    const cards=props.cards 
    const [show, setShow]= useState(props.show)
    // const toggle = () => setShow(show => !show);
    console.log("props.id:"+props.id)
    const cardElements = cards.map((card) => (
      <Card key={card.id} card={card}
            boardId={props.id}
            addCard={props.addCard}
            removeCard={props.removeCard}/>
    ));
  
  return (
    <div style={{height: show? " ":'60px'}} className='board-container' >
      <div className='board-header'>
      <div style={{backgroundColor: color}} className='board-color'></div>
      <h1>{board_name} 
      <FontAwesomeIcon onClick={()=>setShow(!show)} icon={faAngleDown} />
      <FontAwesomeIcon onClick={()=>props.removeBoard()} icon={faTrash}/>
      </h1>
      </div>
      {show &&(
      <div className='board-content'>    
      {cardElements}
      <AddTask/>
      </div>)}
    </div>
  )
}

export default Board
