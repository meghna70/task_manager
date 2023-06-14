import React, { useEffect,useState } from 'react'
import dashboard from "../dashboard.png"
  
function Dashboard(props) {
  const [projects,setProjects]=useState();
  
 
  return (
    <div className='dashboard-container'>
        <div className='dashboard-profile-container'>
          
          <div className='dashboard-profile'>
            <div className='dashboard-details'>
              Welcome Back <span>{props.user}</span>
              </div>
            <div className="dashboard-icon">
               {/* <img src={dashboard} /> */}
            </div>
          </div>
        </div>
        <div className='dashboard-projects'>
          <p>Recent Projects</p>
          <div>
            {

            }
          </div>
        </div>
    </div>
  )
}

export default Dashboard

