import React, { useState } from 'react'
import Label from './Label'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import ViewCard from './ViewCard'

function Card(props) {
    var card_name=props.card_name
    const [isHover, setHover]= useState(null)
    const [show, setShow] = useState(false)
    const handleMouseOn=(member)=>{
        setHover(member)
    }
   
    const handleMouseOff=()=>{
        setHover(null)
    }
   
    var members=[ 
        { 
            name:"pearl"
          },
        { 
            name:"patrick"
          },
        {
            name:"Gary" 
          },
        {
            name:"Sandy"
        }]
    
    const collaborators= members.map((member,counter)=>{
        if(counter<2){  
        counter++;
        return(<div  key={member.name}>
                <FontAwesomeIcon className='tooltip'
                onMouseOver={() => handleMouseOn(member)}
                                onMouseOut={handleMouseOff}
                                class="hovertext" 
                                data-hover={member.name} 
                                icon={faUser} 
                                height="15px"
                                width="15px"
                    />
                     {isHover && isHover.name === member.name && (
            <div className='tooltiptext'>{member.name}</div>
          )}
                
            </div>)
        }
        else if(counter===2){
            counter++;
            const s= members.length-counter+1;
            return(<div> and {s} more </div>)
        }
        else{
            return(<></>)
        }
        })
  const removethisCard = () => {
          props.removeCard(props.card.id, props.boardId);
          console.log("props.card.id:"+props.card.id);
          console.log("props.boardId:"+props.boardId);
          console.log("remove this card")
        };
  const toggleModal = () => {
          setShow((prevShow) => !prevShow);
        };
  return (
    <div className='card-container'>
        
        <div className='card-label'>
         <Label text={props.card.priority}/>
        </div>
        <div 
              className='card-name'>
        <div >
         <h3  onClick={toggleModal}
              data-modal-target="defaultModal" 
              data-modal-toggle="defaultModal">
              {props.card.name} 
         <span className='card-del' onClick={removethisCard} >
             <FontAwesomeIcon  icon={faTrash} />  
      </span>
      </h3> 
              {show? <ViewCard toggleModal={toggleModal}
                               cards={props}/>
                  :
                  null}
         <h1>{props.card.date}</h1>
        </div>
          <div className='card-desc'>
             {props.card.desc}
        </div>
        </div>
        <div className='card-subcontainer'>
            <div className='card-details'>
            <FontAwesomeIcon  icon={faComment} />
            <FontAwesomeIcon  icon={faPaperclip} />
            </div>
            <div className='participants'>
              {collaborators}
            </div>
        </div>
    </div>
    
  )
}

export default Card


