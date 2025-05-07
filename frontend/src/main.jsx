import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { FilterContextProvider } from './context/FilterContext.jsx'
import { SavedContextProvider } from './context/savedContext.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
     <AuthContextProvider>
          <FilterContextProvider>
              <SavedContextProvider>
                    <SocketContextProvider>
                                         <App />
                    </SocketContextProvider>
            </SavedContextProvider>
          </FilterContextProvider>
     </AuthContextProvider>
  </StrictMode>
  </BrowserRouter>
)
