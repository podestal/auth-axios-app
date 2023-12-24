import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"



const Users = () => {

    const [users, setUsers] = useState()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("auth/users/")
                setUsers(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getUsers()
    }, [])

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
            <br />
        </article>
    )
}

export default Users