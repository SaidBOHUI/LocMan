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
                    console.log(res, "logged");
                    setDataUser(res)
                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    // Pour plus trad , 
                    // if (res.data.role === 1) {
                    //     setIsAdmin(true);
                    //     console.log("Administrateur");
                    // }else if(res.data.role === 2){
                    //     setIsSuperAdmin(true);
                    //     console.log("Super-Administrateur");
                    // }
                        // switch (res.data.role) {
                        //     case 1:
                        //         setIsAdmin(true);
                        //         console.log("Administrateur");
                        //       break;
                        //     case 2:
                        //         setIsSuperAdmin(true);
                        //         console.log("Super-Administrateur");
                        //         break;
                        //     default:
                        //       console.log("Not Admin and Not SuperAdmin");
                        // }
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
