import React from "react"
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import './App.css';
import Kanban from "./pages/Kanban"
import Login from "./pages/Login";

function App() {
  return (
   <div>
   <BrowserRouter>
   <Routes>
      <Route path="/" element={<Kanban project_name="project1" />}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
   </div>
   
  );
}

export default App;
