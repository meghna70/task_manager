import React from 'react'
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
      <div className="">
      {  activeMenu &&
         (<>
            <div className="">
            <Link to="/" onClick={handleSideBar} className="">
            <SiShopware /><span>Taskhive</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
            <button type="button" onClick={()=>setActiveMenu((prevActiveMenu)=>!prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block">
                <MdOutlineCancel/>
            </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
             {links.map((item)=>(
               <div key={item.title}>
                <NavLink to={`/${item.name}`}
                  style={({isActive})=>({ backgroundColor:isActive? currentColour :''
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


