import {  BrowserRouter, useRoutes } from 'react-router'
import { Home } from './pages/Home'
import { Article } from './pages/Article'
import { Login } from './pages/LogIn'
import { About } from './pages/About'
import { Author } from './pages/Author'
import { Profile } from './pages/Profile'
import { Favorites } from './pages/Favorites'
import { Category } from './pages/Category'
import { Layout } from './components/Layout'
import { EditArticleForm } from './components/EditArticleForm'
import { PrivateRoute } from './components/PrivateRoute'
import { PublicRoute } from './components/PublicRoute'
import { UserProvider } from './context/UserContext'
import { MostPopular } from './pages/MostPopular'
import { useUserStore } from '@/stores/userStore'
import { supabase } from '@/supabaseClient'
import { useEffect } from 'react'
import { getProfile } from '@/services/getProfile'
function App() {

  const setAuthUser = useUserStore((state) => state.setAuthUser);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    // 1. Obtener la sesión inicial
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setAuthUser(data.session.user);
        const profile = await getProfile(data.session.user.email);
        setUser(profile);
      }
    };
    getSession();

    // 2. Escuchar cambios de auth (login, logout, refresh)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthUser(session?.user || null);
        if (session?.user) {
          getProfile(session.user.email).then((profile) => {
            setUser(profile);
          });
        } else {
          setUser(null);
        }
      }
    );

    // 3. Cleanup
    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [setAuthUser, setUser]);
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
      },
      {
        path: '/category/:category',  
        element: <Category />
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
