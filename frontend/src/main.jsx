import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApplicationProvider } from './context/ApplicationContext';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationProvider>
    <App />
    </ApplicationProvider>
  </StrictMode>,
)
