import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'stream-chat-react/dist/css/v2/index.css'; 
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { FilterContextProvider } from './context/FilterContext.jsx'
import { SavedContextProvider } from './context/savedContext.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
     <AuthContextProvider>
          <FilterContextProvider>
              <SavedContextProvider>
                   
                                         <App />
                   
            </SavedContextProvider>
          </FilterContextProvider>
     </AuthContextProvider>
  </StrictMode>
  </BrowserRouter>
)
