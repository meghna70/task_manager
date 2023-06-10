import React,{useEffect} from 'react'
import { AiOutlineMenu } from 'react-icons/ai';

import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import avatar from '../data/avatar.jpg';
import {Notification,UserProfile} from '.';
import { useStateContext } from '../contexts/ContextProvider';
import Kanban from '../pages/Kanban';
const NavButton=({title,customFunc,icon,color,dotColor})=>(
<TooltipComponent content={title} position="BottomCenter">
<button type="button" onClick={customFunc} style={{color}} 
className="relative text-xl rounded-full p-3 hover:bg-light-gray">
  <span style={{background:dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
    {icon}
</button>
</TooltipComponent>
)

const Navbar = () => {
  const {activeMenu,setActiveMenu,isClicked,setIsClicked,currentColour,handleClick,screenSize,setScreenSize}=useStateContext();
  useEffect(()=>{
    const handleWindowResize=()=>setScreenSize(window.innerWidth);
      window.addEventListener('resize',handleWindowResize);
      handleWindowResize();
      return()=>window.removeEventListener('resize',handleWindowResize);
    
  },[]);

  useEffect(()=>{
    if(screenSize<=900){
      setActiveMenu(false);
    }
    else{
      setActiveMenu(true);
    }
  },[screenSize]);
  const handleActiveMenu=()=>{
    setActiveMenu(!activeMenu);
  }
  return (
    <div className=" ">
    <div className="">
      <NavButton title="Menu" customFunc={handleActiveMenu}
      color={currentColour} icon={<AiOutlineMenu/>}/>
      <div className=''>
      
     
      <NavButton title="Notification" dotColor="#03c9d7" customFunc={()=>handleClick('notification')}
      color={currentColour} icon={<RiNotification3Line/>}
      />
      <TooltipComponent content="Profile" position='Bottom Center'>
        <div className=""
        
          onClick={()=>handleClick('userProfile')}>
            <img className="" src={avatar}/>
            <MdKeyboardArrowDown className=''/>
        </div>
      </TooltipComponent>
      {isClicked.chat && (<Kanban/>)}
      {isClicked.Notification &&(<Notification/>)}
      {isClicked.userProfile &&(<UserProfile/>)}
      </div>
      </div>
      </div>
  );
};

export default Navbar