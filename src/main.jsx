import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import $ from 'jquery';
import './index.css'
import './styles/App.css'
import './scripts/script.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
