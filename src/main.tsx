import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './components/AuthProvider.tsx'
import RouterOutlet from './components/RouterOutlet.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterOutlet />
    </AuthProvider>
  </StrictMode>,
)
