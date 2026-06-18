import { ConfigProvider } from '@nutui/nutui-react'
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
    <ConfigProvider
      theme={{
        nutuiColorPrimary: '#2563eb',
        nutuiFormItemRequiredColor: '#ff0f23',
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
)
