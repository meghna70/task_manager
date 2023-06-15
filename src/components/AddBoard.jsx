import React from 'react'
import { useState } from 'react'
import { faClose,faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ID} from 'appwrite';
function AddBoard(props) {
  const proj_id="6487dcefdf581387f277"
    const [isAdd, setAdd]=useState(false)
    const[boardName, setBoardName]=useState("")
    const handletoggle=()=> {
      setAdd((prev)=>!prev)
    }
    const handleChange = (e) => {
      setBoardName(e.target.value);
    };

    const handleSubmit = async(event) => {
      // const newBoard = {
      //   id:Date.now()+Math.random()*2,
      //   name: boardName,
      //   color:"#ce7ddc",
      //   cards:[]
           
      // };
      event.preventDefault();
      
      props.addBoard(boardName,proj_id);
      setAdd(false);
      setBoardName('');
    };
  
  return (
    <div className='AddBoard-container'>
        {     isAdd?
               <form className='addboardform' onSubmit={handleSubmit}>
                    <FontAwesomeIcon className='add-close' onClick={handletoggle} icon={faClose}/>
                    <input className='addboard-input' 
                          placeholder="Add Board Name"
                          type="text"
                          value={boardName}
                          id="boardName"
                          name="boardName"
                          onChange={handleChange}/>
                    <button className='addboard-btn' type='submit'>Add</button>
                    
               </form> :
               <div className='addboard-sign' onClick={handletoggle}>
                Add board 
                <FontAwesomeIcon icon={faCirclePlus}/>
                </div> 
        }
    </div>
  )
}

export default AddBoard