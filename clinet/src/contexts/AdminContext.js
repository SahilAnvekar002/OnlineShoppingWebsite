import { createContext, useEffect, useState } from "react";
import { url, postRequest } from '../utils/services'
import {useNavigate} from 'react-router-dom'

export const AdminContext = createContext()

export const AdminContextProvider = ({children}) =>{

    const navigate = useNavigate()
    const [admin, setAdmin] = useState(null)
    const [adminInfo, setAdminInfo] = useState({
        username:"",
        password:""
    })
    const [adminError, setaAdminError] = useState("")
    
    useEffect(() => {
        const temp = localStorage.getItem('admin') 
        setAdmin(temp)
    }, [])
    
    const updateAdminInfo = (info) =>{
        setAdminInfo(info)
    }

    const adminLogin = async(e) =>{
        e.preventDefault()
        const response = await postRequest(`${url}/admin/admin-login`, adminInfo)

        if(response?.error){
            setaAdminError(response?.message)
        }
        else{
            setAdmin(response?.admin?.username)
            localStorage.setItem('admin', response?.admin?.username)
            setAdminInfo({
                username:"",
                password:""
            })
            navigate('/admin')
        }
    }

    const logout =(e)=>{
        e.preventDefault()
        setAdmin(null)
        localStorage.removeItem('admin')
        navigate('/admin-login')
    }

    return (
        <AdminContext.Provider value={{admin, adminInfo, updateAdminInfo, adminLogin, adminError, logout}}>
            {children}
        </AdminContext.Provider>        
    )
}