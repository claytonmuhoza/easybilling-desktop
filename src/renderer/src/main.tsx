// import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { SidebarProvider } from './context/SideBarContext'
import { UniteMesureProvider } from './context/UniteMesureContext'
import { BrowserRouter } from 'react-router-dom'
import { CategorieProvider } from './context/CategorieContext'
import { ClientProvider } from './context/ClientContext'
import { ProductProvider } from './context/ProductContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <UniteMesureProvider>
            <CategorieProvider>
              <ClientProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </ClientProvider>
            </CategorieProvider>
          </UniteMesureProvider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
