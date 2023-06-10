import React from 'react'
import{MdOutlineCancel} from 'react-icons/md';
import {Button} from '.';
import{userProfileData} from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const UserProfile = () => {
  const{currentColour} =useStateContext();

  return (
      <div className='nav-item right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-lg dark:text-gray-400'>User Profile</p>
          <Button icon={ <MdOutlineCancel/>}
                  size="2xl"
                  color="rgb(153,171,180)"
                  bgHoverCol='light-gray'
                  radius ='50%'
          />
        </div>
        <div className='flex gpa-5 items-center mt-6 border-color border-b-1 pb-6'>
          <img className='rounded-full h-24 w-24' src={avatar} alt='usrProf'/>
          <div>
          <p className="font-semibold text-xl dark:text-gray-200 ml-3"> Michael Roberts </p>
          </div>
        </div>
        <div>
          {userProfileData.map((item,index)=>(
            <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
              <button type="button" style={{color:item.iconColor, backgroundColor:item.iconBg}} 
              className='text-xl rounded-lg p-3 hover:bg-light-gray'>
                {item.icon}
              </button>
              <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400 ">{item.desc}</p>
              </div>
              </div>
          ))}
        </div>
      <div className='mt-5'>
        <Button
        text="Logout"
        color="white"
        bgCol={currentColour}
        radius='10px'
        width='full'
        />
      </div>
      </div>

    )
}

export default UserProfile