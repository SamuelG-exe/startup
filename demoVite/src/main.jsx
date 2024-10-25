import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Accordion from './Accordion.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<Accordion />*/}
  </StrictMode>,
)
