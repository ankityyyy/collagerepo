import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './redux/app/Store.jsx';
import App from './App.jsx'
import UserLog from "./landingpage/UserLog.jsx"

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
     <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<UserLog/>} />
        
       
      </Routes>
     
    </BrowserRouter>
  
</Provider>,
)
