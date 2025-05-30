import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Profile from './pages/ProfilePage'
import Setting from './pages/SettingPage'
import SignUp from './pages/SignUpPage'
import { Routes, Route, Navigate } from "react-router-dom"
import axiosInstanace from './lib/axios'
import useAuthStore from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import useThemeStore from './store/useThemeStore'

function App() {
  const { authUser, checkAuth, isCheckingAuth ,onlineUsers } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


   console.log({onlineUsers});
  const {theme} = useThemeStore();

  if (isCheckingAuth && authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />

      </div>
    )
  }


  return (
    <>
      <div data-theme={theme}>
        
        <Navbar />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" replace />} />
          <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
          <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
