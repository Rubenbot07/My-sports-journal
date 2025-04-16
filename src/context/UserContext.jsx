import {  createContext, useContext, useReducer} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import usersData from '../mock-data/users-data-base.json'
import Articles from '../mock-data/sports-articles.json'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const initialState = {
        user: null,
        role: null,
        wrongUser: false,
        articles: Articles,
        users: usersData,
        favorites: [],
        isEditComment: false
    }

    const userReducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    ...state,
                    user: action.payload.username,
                    role: action.payload.role,
                    wrongUser: false,
                };
            case 'LOGOUT':
                return {
                    ...state,
                    user: null,
                    role: null,
                };
            case 'SET_WRONG_USER':
                return {
                    ...state,
                    wrongUser: true,
                };
            case 'DELETE_ARTICLE':
                return {
                    ...state,
                    articles: state.articles.filter(article => article.id !== action.payload),
                    favorites: state.favorites.filter(favorite => favorite.id !== action.payload),
                };
            case 'EDIT_ARTICLE':
                return {
                    ...state,
                    articles: state.articles.map(article =>
                        article.id === action.payload.id ? { ...action.payload } : article
                    ),
                };
            case 'HANDLE_FAVORITES': {
                const isFavorite = state.favorites.some(fav => fav.id === action.payload);
                return {
                    ...state,
                    favorites: isFavorite
                        ? state.favorites.filter(fav => fav.id !== action.payload)
                        : [...state.favorites, state.articles.find(article => article.id === action.payload)],
                };
            }
            case 'ADD_COMMENT':
                return {
                    ...state,
                    articles: state.articles.map(article =>
                        article.id === action.payload.articleId
                            ? {
                                  ...article,
                                  comments: [...article.comments, action.payload.comment],
                              }
                            : article
                    ),
                };
            case 'DELETE_COMMENT':
                return {
                    ...state,
                    articles: state.articles.map(article =>
                        article.id === action.payload.articleId
                            ? {
                                  ...article,
                                  comments: article.comments.filter(comment => comment.id !== action.payload.commentId),
                              }
                            : article
                    ),
                };
            case 'UPDATE_COMMENT':
                return {
                    ...state,
                    isEditComment: !state.isEditComment,
                    articles: state.articles.map(article =>
                        article.id === action.payload.articleId
                            ? {
                                  ...article,
                                  comments: article.comments.map(comment =>
                                      comment.id === action.payload.commentId
                                          ? { ...comment, content: action.payload.content }
                                          : comment
                                  ),
                              }
                            : article
                    ),
                };
            default:
                throw new Error(`Unhandled action type: ${action.type}`);
        }
    }

    const [userState, dispatch] = useReducer(userReducer, initialState)
    const navigate = useNavigate()
    const location = useLocation()
    const login = ({ username, userPassword }) => {
        const user = userState.users.find(user => user.name === username)
        const userDataPassword = user?.password === userPassword

        if (!user || !userDataPassword) {
            dispatch({ type: 'SET_WRONG_USER' })
            return
        }

        dispatch({ type: 'LOGIN', payload: { username, role: user.role } })
        console.log(location.state?.from)
        navigate(location.state?.from ? location.state.from.pathname : '/')
    }

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/')
    }

    const deleteArticle = (articleId) => {
        dispatch({ type: 'DELETE_ARTICLE', payload: articleId })
        navigate('/')
    }

    const editArticle = (articleId, title, author, publishedDate, content, category) => {
        dispatch({ 
            type: 'EDIT_ARTICLE', 
            payload: { id: articleId, title: title, author: author, publishedDate: publishedDate, content: content, category: category } 
        })
        navigate(`/articles/${articleId}`)
    }
    const handleFavorites = (articleId) => {
        if(!userState.user) {
            navigate('/login', { state: { from: location } })
            return
        }
        dispatch({ type: 'HANDLE_FAVORITES', payload: articleId })
    }
    const addComment = (articleId, comment, userName, date) => {
        const commentObject = {
            userName: userName,
            id: Math.floor(Math.random() * 100000),
            content: comment,
            date: date
        }
        dispatch({ type: 'ADD_COMMENT', payload: { articleId: articleId, comment: commentObject } })
    }
    const deleteComment = (articleId, commentId) => {
        dispatch({ type: 'DELETE_COMMENT', payload: { articleId: articleId, commentId: commentId } })
    }

    const updateComment = (articleId, commentId, comment) => {
        dispatch({ type: 'UPDATE_COMMENT', payload: { articleId: articleId, commentId: commentId, content: comment } })
    }
    const auth = {
        ...userState,
        login,
        logout,
        deleteArticle,
        editArticle,
        handleFavorites,
        addComment,
        deleteComment,
        updateComment,
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