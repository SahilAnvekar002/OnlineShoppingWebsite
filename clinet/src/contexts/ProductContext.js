import { createContext, useEffect, useState } from "react";
import { deleteRequest, getRequest, postRequest, url } from "../utils/services";
import { useNavigate } from "react-router-dom";

export const productContext = createContext()

export const ProductContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [productInfo, setProductInfo] = useState({
        category: '',
        description: '',
        rating: '',
        marketPrice: '',
        discountPrice: '',
        image: ''
    })
    const [productError, setProductError] = useState("")

    useEffect(() => {

        const getProducts = async () => {
            const response = await getRequest(`${url}/product/getallproducts`)

            if (!response?.error) {
                setProducts(response)
            }
        }

        getProducts()

    }, [])

    const updateProductInfo = (info) => {
        setProductInfo(info)
    }

    const addProduct = async (productInfo) => {
        const response = await postRequest(`${url}/product/add`, productInfo)

        if (!response?.error) {
            setProducts((prev) => [...prev, response])
            setProductError("")
        }
        else{
            setProductError(response?.message)
        }

        setProductInfo({
            category: '',
            description: '',
            rating: '',
            marketPrice: '',
            discountPrice: '',
            image: ''
        })
    }

    const updateProduct = async (e, id, productInfo) => {
        const response = await postRequest(`${url}/product/update/${id}`, productInfo)

        if (!response?.error) {
            const data = await getRequest(`${url}/product/getallproducts`)
            setProducts(data)

            setProductInfo({
                category: '',
                description: '',
                rating: '',
                marketPrice: '',
                discountPrice: '',
                image: ''
            })
            setProductError("")
        }
        else{
            setProductError(response?.message)
        }

    }

    const deleteProduct = async (e, id) => {
        e.preventDefault()
        // eslint-disable-next-line
        const response = await deleteRequest(`${url}/product/delete/${id}`)

        const data = await getRequest(`${url}/product/getallproducts`)
        setProducts(data)
        navigate('/admin')
    }

    return (
        <productContext.Provider value={{ products, productInfo, updateProductInfo, addProduct, updateProduct, deleteProduct, productError }}>
            {children}
        </productContext.Provider>
    )
}