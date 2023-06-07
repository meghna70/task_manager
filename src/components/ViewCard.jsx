import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  { useEffect, useState, useSyncExternalStore } from 'react'
import { faCirclePlus,faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
const ViewCard=(props)=> {
    const [isEditMode, setEditMode] = useState(false);
    const[card, setCard]=useState({
        card_id:"",
        card_name:"",
        deadline:"",
        priority:"",
        attachment:[],
        participants:[],
        comments:[]
        })
     useEffect(()=>{
      axios.get("")
            .then(res=>{
              setCard(res.data)
            })
            .catch(error=>{
              console.log(error)
            })
  },[])
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    window.alert("submitted")
    // Perform save/update logic here
    // Example: props.updateCard(card);
    setEditMode(false);
  };

  const handleEdit = (e) => {
   e.preventDefault()
   setEditMode(true)
  };

  return (  
        <>
            <div
              className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h2 className="text-2xl font-semibold">
                      {props.cards.card.name}
                    </h2>
                    <button
                      className=""
                      onClick={()=>props.toggleModal(false)}
                    >
                      <span className="">
                        <FontAwesomeIcon icon={faClose}/>
                      </span>
                    </button>
                  </div>
                  <form>
                  {/*body*/}
                     <div className='viewcard-details'>
                       
                            <div className='viewcard-details-section'>
                                <span>Assignee:</span>
                                {   isEditMode?
                                     <input
                                     type="text"
                                     id="cardName"
                                     name="card_name"
                                     value={card.card_name}
                                     onChange={handleFieldChange}
                                     className="w-full border border-gray-300 rounded-md p-2"
                                   />
                                    :
                                    <span className='viewcard-text'>{"   "}{props.cards.card.assignee}</span>}
                            </div>
                            <div className='viewcard-details-section'>
                                <span>Deadline:</span><span className='viewcard-text'>{"   "}{props.cards.card.date}</span>
                            </div>
                            <div className='viewcard-details-section'>
                            <span>Priority:</span>
                                { isEditMode? 
                                   ( <select 
                                    id="priority"
                                    className="addtask-inputs"
                                    value={card.priority}
                                    onChange={handleFieldChange}
                                    name="priority"
                                      >
                                      <option value="high">High</option>
                                      <option value="medium">Medium</option>
                                      <option value="low">Low</option>
                                </select>)
                                :
                                <span className='viewcard-text'>{"   "}{props.cards.card.priority}</span>}
                            </div>
                            <div className='viewcard-details-section'>
                                <fieldset>
                                <legend>Files:</legend><span className='viewcard-text'>{"   "}{}</span>
                                </fieldset>   
                            </div>
                            <div className='viewcard-details-section'>
                                <span>Description:</span><span className='viewcard-text'>{"   "}{props.cards.card.desc}</span>
                            </div>
                     </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                       onClick={()=>props.toggleModal(false)}
                    >
                      Close
                    </button>
                    {
                        isEditMode?
                        <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        onClick={handleSubmit}
                        
                      >
                       save changes
                      </button>:
                    <button
                      type="submit"
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                       onClick={handleEdit}
                    >
                     edit
                    </button>
                    }
                    
                  </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
   
  )
}

export default ViewCard