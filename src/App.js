import React,{useEffect, useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import{TooltipComponent} from '@syncfusion/ej2-react-popups';
import{Navbar,Sidebar,ThemeSettings} from './components'
import Project from "./pages/Projects"
import  Calendar from "./pages/Calendar"
import ColorPicker from "./pages/ColorPicker"
import Tasks from "./pages/Tasks"
import Profile from './pages/Profile'
import { useStateContext } from './contexts/ContextProvider';
import './App.css'
import Login from './pages/Login';

const App = () => {
  const {activeMenu,currentColour,setCurrentColour,currentMode,setCurrentMode,themeSettings,setThemeSettings}=useStateContext();

  useEffect(()=>{
      const currentThemeColour=localStorage.getItem("colourMode");
      const currentThemeMode=localStorage.getItem("themeMode");
      if (currentThemeColour&&currentThemeMode){
          setCurrentColour(currentThemeColour);
          setCurrentMode(currentThemeMode);
      }
  },[]);
  return (
  <div className={currentMode==='Dark'?'dark':''}>
  <BrowserRouter>
  
      <div className="flex relative dark:bg-main-dark-bg">
          <div className='fixed right-4 bottom-4' style={{zIndex:'1000'}}>  
              
               <TooltipComponent content="Settings" position="Top">
                  <button  type="button" onClick={()=>setThemeSettings(true)} className="settings-btn text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" 
                          style={{background:currentColour, borderRadius:'50%'}}>
                      <FiSettings/>
                  </button>
              </TooltipComponent>
        </div>
          {/* {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg 
              bg-white">
              <Sidebar/>
              </div>
              ):(
                  <div className="w-0 dark:bg-secondary-dark-bg">
                     <Sidebar/>
                  </div>
              )} */}
             
              {/* <div className={
                  `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                  activeMenu ?
                   'md:ml-72'
                  :
                  'flex-2'}`
              }> */}
                 
                     
                
                 <ThemeSettings/>
                  <Routes >
                      {/*Dashboard */}
                      <Route path="/" element={<Login/>}/>

                      {/* <Route path="/" element="TaskManager" /> */}
                      <Route path="/profile" element={<><Sidebar/><Navbar/><Profile/></>}/>
                      {/*Pages */}
                      <Route path="/projects" element={<><Sidebar/><Navbar/><Project/></>}/>
                      <Route path="/tasks" element={<><Sidebar/><Navbar/><Tasks/></>}/>
                      {/*Calendar */}
                      <Route path="/calendar" element={<><Sidebar/><Navbar/><Calendar/></>}/>
                      {/*Charts */}
                      
                  </Routes>
              </div>
  </BrowserRouter>
  </div>

)
}

export default App