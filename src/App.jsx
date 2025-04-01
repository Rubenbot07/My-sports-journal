import {  BrowserRouter, useRoutes } from 'react-router'
import { Home } from './pages/Home'
import { Article } from './pages/Article'
import { Login } from './pages/LogIn'
import { About } from './pages/About'
import { SignUp } from './pages/SignUp'
import { Author } from './pages/Author'
import { Profile } from './pages/Profile'
import { Favorites } from './pages/Favorites'
import { Layout } from './components/Layout'
import { EditArticleForm } from './components/EditArticleForm'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { UserProvider } from './context/UserContext'
import { MostPopular } from './pages/MostPopular'
function App() {
  const AppRoutes = () => {
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
      {
        path: '/favorites',  
        element: <PrivateRoute><Favorites /></PrivateRoute>
      },
      {
        path: '/profile',
        element : <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: '/profile/:userName',  
        element: <Profile />
      },
      {
        path: '/login',  
        element: <PublicRoute><Login /></PublicRoute>
      },
      {
        path: '/articles/edit/:articleId',
        element: (
            <PrivateRoute roles={['admin', 'editor']}>
                <EditArticleForm />
            </PrivateRoute>
        )
    },
      {
        path: '/signup',  
        element: <PublicRoute><SignUp /></PublicRoute>
      },
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
