import {  BrowserRouter } from 'react-router'
import { UserProvider } from './context/UserContext'
import { useAuthSession } from './hooks/useAuthSession'
import { AppRoutes } from '@/routes/AppRoutes'
import { Layout } from '@/components/Layout'
function App() {
  useAuthSession()

  return (
    <BrowserRouter>
      <UserProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </UserProvider>
      </BrowserRouter>
  )
}

export default App
