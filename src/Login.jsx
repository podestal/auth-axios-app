import { useState, useContext } from "react"
import AuthContext from "./context/AuthProvider"
import axios from "./api/axios"

const LOGIN_URL = "/auth/jwt/create/"
const USER_URL = "/auth/users/me"

const Login = () => {

    const { setAuth } = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const jwtResponse = await axios.post(LOGIN_URL, ({
                username,
                password
            }), {
                headers: { "Content-Type": "application/json" }
            })
            const accessToken = jwtResponse.data.access
            const userResponse = await axios.get(USER_URL, {
                headers: { Authorization: `JWT ${accessToken}`}
            })

            const id = userResponse.data.id
            const email = userResponse.data.email
            await setAuth({ id, username, email, accessToken })
            console.log({id, username, email, accessToken});
            setUsername("")
            setPassword("")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

export default Login