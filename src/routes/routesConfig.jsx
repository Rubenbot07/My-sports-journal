import { Navigate } from "react-router-dom";
import {Home} from "@/pages/Home";
import { About } from "@/pages/About";
import {MostPopular} from "@/pages/MostPopular";
import {Favorites} from "@/pages/Favorites";
import {Profile} from "@/pages/Profile";
import {Login} from "@/pages/LogIn";
import { SignUp } from "@/pages/Signup";
import {Article} from "@/pages/Article";
import {Author} from "@/pages/Author";
import {EditArticleForm} from "@/components/EditArticleForm";
import {Category} from "@/pages/Category";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { UpdatePassword } from "@/pages/UpdatePassword";
import {PrivateRoute} from "@/components/PrivateRoute";
import {PublicRoute} from "@/components/PublicRoute";

export const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/most-popular", element: <MostPopular /> },

  { path: "/favorites", element: <PrivateRoute><Favorites /></PrivateRoute> },
  { path: "/profile", element: <PrivateRoute><Profile /></PrivateRoute> },
  { path: "/profile/:userEmail", element: <Profile /> },

  { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
  { path: "/register", element: <PublicRoute><SignUp /></PublicRoute> },

  {
    path: "/articles/edit/:articleId",
    element: (
      <PrivateRoute roles={["admin", "editor"]}>
        <EditArticleForm />
      </PrivateRoute>
    ),
  },

  { path: "/articles", element: <Navigate to="/" /> },
  { path: "/articles/:articleId", element: <Article /> },
  { path: "/articles/edit", element: <Navigate to="/" /> },

  { path: "/authors", element: <Navigate to="/" /> },
  { path: "/authors/:authorId", element: <Author /> },

  { path: "/category/:category", element: <Category /> },

  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/update-password", element: <UpdatePassword /> },

  { path: "*", element: <h1>404</h1> },
];