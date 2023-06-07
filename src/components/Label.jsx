import React from 'react';
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Label(props) {
  const priority = props.text + " priority";
  let style={}
  if (props.text == "low"){
           style= {backgroundImage:"linear-gradient(138.6789deg, #c781ff 17%, #e57373 83%)"}
        } 
    else if (props.text == "medium"){
        style= {backgroundImage:" linear-gradient(to left, #2193b0, #6dd5ed)"}
      } 
    else{
      style={backgroundImage:" linear-gradient(to left, #fdc830, #f37335)"}
    }
      
    

  return (
    <div className='label-container' style={style}>
      <h3>
        {priority}
      </h3>
      
    </div>
  );
}

export default Label;
