import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LoaderProvider } from './context/LoaderContext.jsx'
import ToastProvider from './context/ToasterProvider.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
    <StrictMode>
     <AuthProvider>
        <LoaderProvider>
          <App />
          <Toaster position="top-right" />
        </LoaderProvider>
     </AuthProvider>
    </StrictMode>,
)
