import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar, ThemeSettings } from './components';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Users from './pages/Users';
import Calendar from './pages/Calendar';
import Notification from './components/Notification';
import { useStateContext } from './contexts/ContextProvider';
import './App.css';
import Kanban from './pages/Kanban';

const MainLayout = ({ children }) => {
  const { activeMenu, currentColour, setCurrentColour, currentMode, setCurrentMode, themeSettings, setThemeSettings } =
    useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            onClick={() => setThemeSettings(true)}
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            style={{ background: currentColour, borderRadius: '50%' }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
          activeMenu ? 'md:ml-72' : 'flex-2'
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div className="content">
          {themeSettings && <ThemeSettings />}
          {children}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const { currentMode, setCurrentColour, setCurrentMode } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const currentThemeColour = localStorage.getItem('colourMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColour && currentThemeMode) {
      setCurrentColour(currentThemeColour);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const handleLogin = (e) => {
    setIsLoggedIn(e);
  };

  useEffect(() => {
    console.log('islogged:', isLoggedIn);
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <MainLayout>
                  <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="/dashboard"element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/calender" element={<Calendar />} />
                  <Route path="/notification" element={<Notification />} />
                  <Route path="/kanban" element={<Kanban />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
