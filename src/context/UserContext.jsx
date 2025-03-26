import {  createContext, useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import usersData from '../mock-data/users-data-base.json'

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [wrongUser, setWrongUser] = useState(false)
    const navigate = useNavigate()
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
        navigate('/')
    }

    const logout = () => {
        setUser(null)
        navigate('/')
    }

    const auth = { user, setUser, login, logout, wrongUser, role }
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