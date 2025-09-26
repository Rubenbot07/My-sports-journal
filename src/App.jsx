import {  BrowserRouter } from 'react-router-dom'
import { useAuthSession } from './hooks/useAuthSession'
import { AppRoutes } from '@/routes/AppRoutes'
import { Layout } from '@/components/layout/Layout'
function App() {
  useAuthSession()

  return (
    <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
    </BrowserRouter>
  )
}

export default App
