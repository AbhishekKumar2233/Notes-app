import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import { LoaderProvider, useLoader } from './context/LoaderContext'
import GlobalLoader from './components/GlobalLoader'

function App() {
  const { loading } = useLoader();
  
  if(loading) return <GlobalLoader />
  
  return (
    <BrowserRouter>
    <Routes>
      <Route 
      path="/" 
      element={<ProtectedRoute>
        <Dashboard />
        </ProtectedRoute>} 
      />
      
      <Route 
      path="/login" 
      element={<LoginPage />} />

      <Route 
      path="/register" 
      element={<RegisterPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
