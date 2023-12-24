import axios from "../api/axios"
import useAuth from "./useAuth"

const useRegreshToken = () => {

    const { auth, setAuth } = useAuth()
    const refresh = async () => {
        console.log("refresh Token", auth.refreshToken)
        const response = await axios.post('/auth/jwt/refresh/', ({
            "refresh": auth.refreshToken
        }))
        setAuth(prev => ({...prev, accessToken: response.data.access}))
        return response.data.access
    }

    return refresh
}

export default useRegreshToken