import { createContext, useEffect, useState } from "react";
import { getRequest, postRequest, url } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [userInfo, setuserInfo] = useState({
        username: '',
        password: ''
    })
    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: ''
    })
    const [userError, setUserError] = useState("")
    const [cart, setCart] = useState({})


    useEffect(() => {

        const getCart = async (id) => {
            const response = await getRequest(`${url}/cart/getcart/${id}`)
            setCart(response)
        }

        const getUser = async (id) => {
            const response = await getRequest(`${url}/user/getuser/${id}`)
            setUser(response)
        }

        const temp = JSON.parse(localStorage.getItem('user'))

        if (temp) {
            getUser(temp._id)
            getCart(temp._id)
        }

    }, [])


    const updateUserInfo = (info) => {
        setuserInfo(info)
    }
    const updateSignupInfo = (info) => {
        setSignupInfo(info)
    }

    const userLogin = async (e) => {
        e.preventDefault()
        const response = await postRequest(`${url}/user/login`, userInfo)

        if (response?.error) {
            setUserError(response?.message)
            setuserInfo({ username: '', password: '' })
        }
        else {
            setUserError("")
            setUser(response?.user)
            localStorage.setItem('user', JSON.stringify(response?.user))
            const data = await getRequest(`${url}/cart/getcart/${response?.user?._id}`)
            setCart(data)
            setuserInfo({ username: '', password: '' })
            navigate('/')
        }
    }
    const userSignup = async (e) => {
        e.preventDefault()

        if (signupInfo.password === signupInfo.cpassword) {
            const response = await postRequest(`${url}/user/signup`, {
                username: signupInfo.username,
                email: signupInfo.email,
                password: signupInfo.password
            })

            if (response?.error) {
                setUserError(response?.message)
                setSignupInfo({ username: '', email: '', password: '', cpassword: '' })
            }
            else {
                setUserError("")
                setUser(response?.user)
                localStorage.setItem('user', JSON.stringify(response?.user))
                const data = await getRequest(`${url}/cart/getcart/${response?.user?._id}`)
                setCart(data)
                setSignupInfo({ username: '', email: '', password: '', cpassword: '' })
                navigate('/')
            }
        }
        else {
            setUserError("Passwords does not match")
        }

    }

    const logout = async () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const updateCart = async (e, productId, productQuantity) => {
        e.preventDefault()
        // eslint-disable-next-line 
        const response = await postRequest(`${url}/cart/update/${user._id}`, {
            productId: productId,
            productQuantity: productQuantity
        })

        const data = await getRequest(`${url}/cart/getcart/${user._id}`)
        setCart(data)
    }

    return (
        <UserContext.Provider value={{ userInfo, updateUserInfo, userError, setUserError, userLogin, signupInfo, updateSignupInfo, userSignup, cart, user, updateCart, logout }}>
            {children}
        </UserContext.Provider>
    )
}