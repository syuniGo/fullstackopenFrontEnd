import { StrictMode, } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// axios.get('http://localhost:3001/notes').then(response => {
//   const notes = response.data
//   createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
