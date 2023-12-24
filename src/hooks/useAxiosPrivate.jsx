import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRegreshToken from "./useRefreshToken";
import useAuth from "./useAuth";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";

const useAxiosPrivate = () => {
    const refresh = useRegreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        console.log("From interceptor", auth)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `JWT ${auth.accessToken}`
                }
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config
                const exp = jwtDecode(auth.accessToken).exp
                const isExpired = dayjs.unix(exp).diff(dayjs()) < 1
                if (isExpired) {
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `JWT ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                } 
                return Promise.reject(error)
            }
        )
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept)
            axiosPrivate.interceptors.request.eject(requestIntercept)
        }
    }, [auth, refresh])

    return axiosPrivate

}

export default useAxiosPrivate