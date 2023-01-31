import axios from "axios";
import {useState, useEffect} from "react";

function UserApi(token){
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    // const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [dataUser, setDataUser] = useState(false)

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infos', {headers: {Authorization : token}}) 
                    setIsLogged(true)
                    setDataUser(res.data)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                       
                } catch (error) {
                    alert(error.response.data.msg)
                }
            }
            getUser()
        }
    }, [token])

    return({
        dataUser: [dataUser, setDataUser], 
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        // isSuperAdmin: [isSuperAdmin, setIsSuperAdmin]
    })
}

export default UserApi
