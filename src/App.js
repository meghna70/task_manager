import React from "react"
import './App.css';
import Kanban from "./pages/Kanban"
import Login from "./pages/Login";

function App() {
  return (
   <>
    <Kanban 
      project_name="project1" />
    {/* <Login/> */}
   </>
   
  );
}

export default App;
