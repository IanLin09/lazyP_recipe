import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Router from '@/router.tsx'
import {BrowserRouter} from 'react-router-dom'
import { HeaderProvider } from '@/components/header'
import { LoginProvider } from '@/components/login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeaderProvider>
        <LoginProvider>
          <BrowserRouter>
            <Router></Router>
          </BrowserRouter>
        </LoginProvider>
      </HeaderProvider>
    </QueryClientProvider>
  </StrictMode>,
)
