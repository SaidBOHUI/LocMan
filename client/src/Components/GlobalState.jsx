import React, {createContext, useState, useEffect} from "react";
import axios from "axios";
import UserApi from "../APIs/UserApi";
import VehiculesApi from "../APIs/VehiculesApi";


export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)

    const refreshToken = async() => {
        const res = await axios.get("/user/refresh_token")
        setToken(res.data.accesstoken)
        // console.log(token, 'tototoken', res.data.accesstoken); 
        return token
    }

    useEffect(() => {
        const firstLogin = localStorage.getItem("firstLogin")
        if (firstLogin){refreshToken()}
    }, [token])

    const state = { 
        token: [token, setToken],
        userApi: UserApi(token),
        vehiculesApi : VehiculesApi()
    }

    
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
