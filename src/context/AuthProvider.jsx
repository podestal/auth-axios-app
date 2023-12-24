import { createContext, useState } from "react"

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState()
    const [name, setName] = useState("luis")

    return (
        <AuthContext.Provider value={{ auth, setAuth, name, setName }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext