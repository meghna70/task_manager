import React,{createContext,useState,useContext} from 'react';
const StateContext=createContext();

const initialState={
    chat:false,
    userProfile:false,
    notification:false,
};

export const ContextProvider=({children})=>{
    const [activeMenu,setActiveMenu]=useState(false);
    const[isClicked,setIsClicked]=useState(initialState);
    const [screenSize,setScreenSize]=useState(undefined);
    const[themeSettings,setThemeSettings]=useState(false);
    const[currentMode,setCurrentMode]=useState('Light');
    const[currentColour,setCurrentColour]=useState('#03C9D7');
    const setMode=(event)=>{
        setCurrentMode(event.target.value);
        localStorage.setItem('themeMode',event.target.value);
    }
    const setColour=(colour)=>{
        setCurrentColour(colour);
        localStorage.setItem('colourMode',colour);
        
    }

    const handleClick=(clicked)=>setIsClicked({...initialState,[clicked]:true});

    return(
        <StateContext.Provider
        value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            handleClick,
            screenSize,
            setScreenSize,
            currentColour,
            currentMode,
            themeSettings,
            setThemeSettings,
            setCurrentColour,
            setCurrentMode,
            setColour,
            setMode,
            initialState
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext=()=>useContext(StateContext); 