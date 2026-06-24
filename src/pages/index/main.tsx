import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/common.scss'
import App from './App'
import './index.scss'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root not found')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
)
