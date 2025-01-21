import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Router from '@/router.tsx'
import {BrowserRouter} from 'react-router-dom'
import Page from '@/pages/app.tsx'
import { HeaderProvider } from '@/components/header'
import { LoginProvider } from '@/components/login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderProvider>
      <LoginProvider>
        <BrowserRouter>
          <Router></Router>
        </BrowserRouter>
    </LoginProvider>
    </HeaderProvider>
  </StrictMode>,
)
