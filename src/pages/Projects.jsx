import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {useParams} from "react-router-dom"
import {Client, Account } from "appwrite"

const Projects = () => {
 
  let client= new Client();
  const account = new Account (client)
  
  const [projects, setProjects]=useState([]);
  const [userId , setUserId]=useState("");
  const url1="https://taskhive-0r79.onrender.com/latest?id=647f2b8bcebfedfc0b58&collectionId=6482152264a5ea482fcf&field=user_ids" //for project collection
  client.setEndpoint('https://cloud.appwrite.io/v1') .setProject('6476c4a36c8cff9ced33');

  async function getaccount(){
    const promise= await account.get()
    console.log(promise)
    console.log(promise.$id)
    setUserId(promise.$id)
  }
 
  let data=[]
  useEffect(()=>{
      getaccount()
      axios.get(url1)
            .then((res)=>{
            data=(res.data.usr_dets.documents)
            console.log(data)
            setProjects(data)
                  })
            .catch(err=>console.log(err)) 
      },[])
    
  
  return (
    <div className='project-container'>
      <div className='project-title'>
        Your Projects 
        {projects.length > 0 && console.log("wtv:" + projects[0].user_ids)}
      </div>
      <div className='project-content-container'>
          <div className='project-content'>
            
          <div class="ag-format-container">
                    <div class="ag-courses_box">
            {

 
              projects.map((project)=>{
                console.log("user_id"+project.user_ids)
              if(JSON.stringify(project.user_ids).includes(userId))
              { 
                return( 
                   
                      <div class="ag-courses_item">
                        <a href="#" class="ag-courses-item_link">
                          <div class="ag-courses-item_bg"></div>

                          <div class="ag-courses-item_title">
                            {project.name}
                          </div>

                          <div class="ag-courses-item_date-box">
                            Deadline:
                            <span class="ag-courses-item_date">
                              {project.date}
                            </span>
                          </div>
                        </a>
                      </div>

                   
                 )
              }
              })
            }
             </div>
                    </div>
          </div>
      </div>
    </div>
  )
}

export default Projects


