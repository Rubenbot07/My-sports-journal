import {  BrowserRouter, useRoutes } from 'react-router'
import { Home } from './pages/Home'
import { Article } from './pages/Article/Article'
import { Login } from './pages/LogIn'
import { About } from './pages/About'
import { SignUp } from './pages/SignUp'
import { Author } from './pages/Author'
import { Profile } from './pages/Profile'
import { Layout } from './components/Layout'
import { EditArticleForm } from './components/EditArticleForm'
import { UserProvider, useAuth } from './context/UserContext'
import { MostPopular } from './pages/MostPopular'
function App() {
  const AppRoutes = () => {
    const auth = useAuth()
    return useRoutes([
      {
        path: '/',  
        element: <Home />
      },
      {
        path: '/about',  
        element: <About />
      },
      {
        path: '/most-popular',  
        element: <MostPopular />
      },
      ...(auth.user ? [
        {
          path: '/profile',  
          element: <Profile />
        },
      ] : [
        {
          path: '/login',  
          element: <Login />
        },
        {
          path: '/signup',  
          element: <SignUp />
        }
      ]),
      
      {
        path: '*',  
        element: <h1>404</h1>
      },
      {
        path: '/articles',  
        element: <Home />
      },
      {
        path: '/articles/:articleId',  
        element: <Article />
      },
      {
        path: '/authors',  
        element: <Home />
      },
      {
        path: '/authors/:authorId',  
        element: <Author />
      },
      ...(auth.role === 'admin' || auth.role === 'editor' ? [
        {
          path: '/articles/edit/:articleId',  
          element: <EditArticleForm />
        },
      ] : []
      ),
      {
        path: '/articles/edit',
        element: <Home />
      }
    ])
  }

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
