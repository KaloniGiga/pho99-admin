import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ConfigProvider } from 'antd'
import LayoutProvider from './context/LayoutContext.tsx'
import AuthProvider from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <LayoutProvider>
    <AuthProvider>
    <ConfigProvider
       theme={{
      token: {
        colorPrimary: '#EC1C24',
      },
    }}
    >
    <App />
    </ConfigProvider>
    </AuthProvider>
    </LayoutProvider>
  </React.StrictMode>,
)
