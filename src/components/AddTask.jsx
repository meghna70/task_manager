import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { faCirclePlus,faClose } from '@fortawesome/free-solid-svg-icons'

function AddTask() {
  const [show,setShow]=useState(false)
  const[card, setCard]=useState({
                        card_id:"",
                        card_name:"",
                        deadline:"",
                        priority:"",
                        attachment:[],
                        participants:[],
                        comments:[]
                        })
  const [searchParticipant, setSearchparticipant]=useState('')
  const [selectedParticipant, setSelectedParticipant]= useState([])
  const [filteredParticipant, setFilteredParticipant]= useState([])
  const [members, setMembers]=useState([])

  function handleChange(event){
    console.log(event)
    const {name, value , type}=event.target
    setCard(prevCardData=>{
      return{
        ...prevCardData,
        [name]:value
      }
    })
  }

  // useEffect(()=>{
  //     axios.get("")
  //           .then(res=>{
  //             setCard(res.data)
  //           })
  //           .catch(error=>{
  //             console.log(error)
  //           })
  // },[])

  useEffect(()=>{
          const filtered = card.participants.filter(participant=>{
            participant.name.toLowerCase().include(searchParticipant.toLowerCase())
          })
          setFilteredParticipant(filtered)
  },[searchParticipant,card.participants])    

  const handleSearch=(event)=>{
    setSearchparticipant(event.target.value)
  }

  const handleMemberSelect=(participant)=>{
    setSelectedParticipant(participant)
  }


  return (
    <div className='add-task'>
      {
        show?
        (
          <>
            <div
              className="Addtask-modal justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h2 className="text-2xl font-semibold">
                      New Task
                    </h2>
                    <button
                      className=""
                      onClick={() => setShow(false)}
                    >
                      <span className="">
                        <FontAwesomeIcon icon={faClose}/>
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className=" p-6 flex-auto">
                    <div className='task-section'>
                          <label htmlFor='card_name'>
                              Task Name
                          </label>
                          <div>
                          <input type="text"
                                id="card_name"
                                className="addtask-inputs"
                                placeholder='Task Name'
                                onChange={handleChange}
                                name="card_name"
                                value={card.card_name}>
                                </input>
                          </div>
                    </div>
                    
                    <div className='task-section'>
                        <label htmlFor="priority">Priority</label>
                            <div>
                            <select 
                                  id="priority"
                                  className="addtask-inputs"
                                  value={card.priority}
                                  onChange={handleChange}
                                  name="priority"
                                    >
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                              </select>
                            </div>
                    </div>
                    <div className='task-section'>
                          <div>
                             <h3>Selected Participants:</h3>
                                {selectedParticipant.map(participant=>(
                                    <li key={participant.id}>{participant.name}</li>
                                ))}
                          </div>
                        <input type="text" 
                                value={searchParticipant}
                                id="participants"
                                className="addtask-inputs"
                                onChange={handleSearch}  
                                placeholder='select participants'/>
                              <ul>
                                {filteredParticipant.map(participant=>(
                                  <li key={participant.id} onClick={()=> handleMemberSelect(participant)}>
                                    {participant.name}
                                  </li>
                                ))}
                              </ul>
                      </div>
                      <div className='task-section'>
                          <div>
                             <h3>Upload attachments</h3>
                          </div>
                        <input type="file" 
                                value={searchParticipant}
                                id="participants"
                                className="addtask-inputs"
                                onChange={handleSearch}  
                                placeholder='select participants'/>
                              <ul>
                                {filteredParticipant.map(participant=>(
                                  <li key={participant.id} onClick={()=> handleMemberSelect(participant)}>
                                    {participant.name}
                                  </li>
                                ))}
                              </ul>
                      </div>
                    </div>
           
                 
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShow(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShow(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )   
         :
          <button className='AddTask-container' 
              onClick={()=>setShow(true)}
              data-modal-target="defaultModal" 
              data-modal-toggle="defaultModal" 
              type="button">
              Add Task 
              {" "}
              <FontAwesomeIcon icon={faCirclePlus}/>
          </button>
      }
    </div>
    
  )
    }

export default AddTask

// <form className='' onClick={()=>setShow(false)} >
// </form>