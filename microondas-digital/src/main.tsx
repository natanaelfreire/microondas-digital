import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'

import './index.css'
import { AuthProvider } from './Context/auth.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider >
    <AuthProvider>
      <App />
    </AuthProvider>
  </ChakraProvider>
)
