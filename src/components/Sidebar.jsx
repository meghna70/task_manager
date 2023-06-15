import React from 'react'
import logo from "../logo.png"
import{Link,NavLink} from 'react-router-dom';
import {MdOutlineCancel} from 'react-icons/md';
import {SiShopware} from 'react-icons/si';
import { TooltipComponent  } from '@syncfusion/ej2-react-popups';
import {links} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
const Sidebar = () => {
  const {activeMenu,currentColour,setActiveMenu,screenSize}=useStateContext ();
  const handleSideBar=()=>{
    if(activeMenu&&screenSize<=900)
    {
      setActiveMenu(false);
    }}
    const activeLink='flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
    const normalLink='flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md text-gray-500 dark:hover:text-black hover:bg-light-gray m-2';
  const Sidebarelement=()=>{
    return(
      <div className="sidebar-container">
      {  activeMenu &&
         (<>
            <div className="sidebar-title">
            <Link to="/profile" onClick={handleSideBar} className="">
            <p><img src={logo} height={40} width={40}/>
                TaskHive </p>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
            <button type="button" onClick={()=>setActiveMenu((prevActiveMenu)=>!prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                <MdOutlineCancel/>
            </button>
            </TooltipComponent>
          </div>
          <div className="sidebar-option mt-10">
             {links.map((item)=>(
               <div key={item.title}>
                <NavLink className="sidebar-link" to={`/${item.title.toLowerCase()}`}
                 style={({ isActive }) => ({
                  color: isActive ? currentColour : '',
                  borderLeft: isActive ? '10px solid rgba(208, 206, 208, 0.7)' : 'none'
                })}>
                  {item.title}
                  
                </NavLink>
              </div>))}
            </div>
              </>)}
        </div>)}
                 

  return (
    <div>
      {activeMenu ? (
              <div className="">
              <Sidebarelement/>
              </div>
              ):(
                  <div className="">
                     <Sidebarelement/>
                  </div>
              )}
    </div>
    
  )
}

export default Sidebar

