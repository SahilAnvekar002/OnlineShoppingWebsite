import React, { useContext, useEffect, useRef, useState } from 'react'
import SideBar from './SideBar'
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminContext } from '../contexts/AdminContext'
import { productContext } from '../contexts/ProductContext'
import { getRequest, url } from '../utils/services'

function UpdateProduct() {

    const location = useLocation()
    const navigate = useNavigate()
    const adminContext = useContext(AdminContext)
    const ProductContext = useContext(productContext)
    const imageRef = useRef()

    const product = location.state
    const { admin, logout } = adminContext
    const { updateProduct, deleteProduct, productError } = ProductContext

    const [productInfo, setProductInfo] = useState({
        category: product.category,
        description: product.description,
        rating: product.rating,
        marketPrice: product.marketPrice,
        discountPrice: product.discountPrice,
        image: ''
    })
    const [isVisible, setIsVisible] = useState(false)

    const updateProductInfo = (info) => {
        setProductInfo(info)
    }

    useEffect(() => {
        const admin = localStorage.getItem('admin')
        if (!admin) {
            navigate('/admin-login')
        }

        const getProduct = async () => {
            const response = await getRequest(`${url}/product/getproduct/${product._id}`)
            setProductInfo({ category: response.category, description: response.description, rating: response.rating, marketPrice: response.marketPrice, discountPrice: response.discountPrice, image: '' })
        }

        getProduct()
        // eslint-disable-next-line
    }, [product])

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }

    const onImageChange = async (e) => {
        const base64 = await convertToBase64(e.target.files[0])

        updateProductInfo({ ...productInfo, image: base64 })
    }

    const updateExistingProduct = (e) => {
        e.preventDefault()
        updateProduct(e, product?._id, productInfo)
        imageRef.current.value = ''

        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000);
    }

    return (
        <>
            <SideBar admin={admin} />
            <div style={{ display: 'flex', width: '60vw', marginLeft: '25vw', flexDirection: 'column', paddingBottom: '70px' }}>
                <h2 className='mt-5 mb-4'>Update Product Information</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input type="text" className="form-control" id="category" name='category' value={productInfo.category} onChange={(e) => updateProductInfo({ ...productInfo, category: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name='description' rows='7' style={{ resize: 'none' }} value={productInfo.description} onChange={(e) => updateProductInfo({ ...productInfo, description: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input type="number" className="form-control" id="rating" name='rating' value={productInfo.rating} onChange={(e) => updateProductInfo({ ...productInfo, rating: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mprice" className="form-label">Market Price</label>
                        <input type="number" className="form-control" id="mprice" name='mprice' value={productInfo.marketPrice} onChange={(e) => updateProductInfo({ ...productInfo, marketPrice: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dprice" className="form-label">Discount Price</label>
                        <input type="number" className="form-control" id="dprice" name='dprice' value={productInfo.discountPrice} onChange={(e) => updateProductInfo({ ...productInfo, discountPrice: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image</label>
                        <input type="file" className="form-control" id="image" name='image' onChange={(e) => onImageChange(e)} ref={imageRef} />
                    </div>

                    <button type="submit" className="btn btn-dark mt-2" onClick={(e) => updateExistingProduct(e)}>Update Product</button>
                    <button type="submit" className="btn btn-dark mt-2 mx-3" onClick={(e) => deleteProduct(e, product?._id)}>Delete Product</button>

                    {isVisible && !productError && <div className="alert alert-success mt-3" role="alert">
                        Product Updated Successfully
                    </div>}
                    {isVisible && productError && <div className="alert alert-danger mt-3" role="alert">
                        {productError}
                    </div>}
                </form>
            </div>
            <button type="submit" className="btn btn-danger" onClick={(e) => logout(e)} style={{position:'absolute', top: '20px', right:'20px'}}>Logout</button>
        </>
    )
}

export default UpdateProduct
