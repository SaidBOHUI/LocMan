import React, { useState, useEffect } from "react";
import axios from "axios";


function VehiculesApi() {
    const [vehicules, setVehicules] = useState([])

    const getVehicules = async() => {
        try {
            let res = await axios.get("http://localhost:8000/api/vehicules")
            setVehicules(res.data.vehicules) 
        } catch (error) {
            console.log(error)
        }
    }

    

    useEffect(() => {
        getVehicules()
    }, [])
    
    return ({
        vehicules: [vehicules, setVehicules]
    })
}

export default VehiculesApi