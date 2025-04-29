import { BrowserRouter } from 'react-router-dom'
import { ChatProvider } from './Context/ChatProvider';
import App from './App.jsx'
import './index.css'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChatProvider>
      <App />
    </ChatProvider>
  </BrowserRouter>
)