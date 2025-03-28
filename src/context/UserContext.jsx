import {  createContext, useState, useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usersData from '../mock-data/users-data-base.json'
import Articles from '../mock-data/sports-articles.json'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [wrongUser, setWrongUser] = useState(false)
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    const login = ({ username, userPassword }) => {
        const user = usersData.find(user => user.name === username)
        const userDataPassword = user?.password === userPassword

        if (!user || !userDataPassword) {
            setWrongUser(true)
            return
        }

        setUser(username)
        setRole(user.role)
        setWrongUser(false)
        navigate(location.state?.from ? location.state.from.pathname : '/')
    }

    const logout = () => {
        setUser(null)
        setRole(null)
        navigate('/')
    }

    const deleteArticle = (articleId) => {
        const articleIndex = Articles.findIndex(article => article.id === articleId)
        Articles.splice(articleIndex, 1)
        navigate('/')
    }

    const editArticle = (articleId, title, author, publishedDate, content) => {
        const articleIdParsed = parseInt(articleId)
        const articleIndex = Articles.findIndex(article =>  article.id === articleIdParsed)
        Articles.splice(articleIndex, 1, { id: articleIdParsed, title: title, author: author, publishedDate: publishedDate, content: content })
        console.log(Articles)
        navigate(`/articles/${articleId}`)
    }
    const handleFavorites = (articleId) => {
        if(!user) {
            navigate('/login', { state: { from: location } })
            return
        }
        if (favorites.some(favorite => favorite.id === articleId)) {
            const updatedFavorites = favorites.filter(favorite => favorite.id !== articleId)
            setFavorites(updatedFavorites)
            return
        }
        const userFavorite = Articles.find(article => article.id === articleId)
        setFavorites(prevFavorites => [...prevFavorites, userFavorite])
    }

    const auth = { 
        user, 
        setUser,
        login,
        logout,
        wrongUser,
        role,
        deleteArticle,
        editArticle,
        favorites,
        handleFavorites
    }
    return (
        <UserContext.Provider value={auth} >
            {children}
        </UserContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useAuth must be used within a UserProvider')
    }
    return context
}