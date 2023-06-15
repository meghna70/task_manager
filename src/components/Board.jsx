import React, { useEffect, useState } from 'react'
import "../App.css"
import Card from "./Card"
import {  faAngleDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddTask from './AddTask'
function Board(props) {
    var board_name=props.board_name
    console.log("Board name: "+ board_name);
    var color= props.color
    const[cards,setCards]=useState([]);
    const cardIds=props.card_ids
    const [show, setShow]= useState(props.show)
    useEffect(()=>{
      setShow(true);
      const bid=props.id;
      console.log("Board id: "+bid);
      (async()=>{
        try{
            const collid=process.env.REACT_APP_CARDS_COLL;
            const promise=await fetch(`https://taskhive-0r79.onrender.com/listDocuments?id=${bid}&collectionId=${collid}&field=${"board_id"}`)
            const response = await promise.json();
            console.log("Cards fetched: ");
            console.log(response.usr_dets.documents);

            setCards(response.usr_dets.documents);
        }
        catch(error){
            console.log(error);
        }
  
  })
  ();
    },[]);

    console.log("props.id:"+props.id)
    const cardElements = cards?cards.map((card) => (
      <Card key={card.id} card={card}
            boardId={props.id}
            addCard={props.addCard}
            removeCard={props.removeCard}/>
    )):null;
  
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
      <AddTask addCard={props.addCard} boardId={props.id}/>
      </div>)}
    </div>
  )
}

export default Board
