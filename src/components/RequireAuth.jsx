import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
    const { auth, name } = useAuth()
    const location = useLocation()

    console.log(auth)

    return (
        auth
            ? <Outlet />
            : <Navigate to={"/login"} />
    )
}

export default RequireAuth