import React, { useContext, useEffect, useState } from 'react'
import { getRequest, url } from '../utils/services'
import { UserContext } from '../contexts/UserContext'

function CartProduct(props) {

    const userContext = useContext(UserContext)
    const { updateCart } = userContext

    const { productId, productQty } = props

    const [product, setProduct] = useState(null)
    const [value, setValue] = useState('')

    useEffect(() => {
        const getProduct = async () => {
            const response = await getRequest(`${url}/product/getproduct/${productId}`)
            setProduct(response)
        }

        getProduct()

        setValue(productQty)
        
    }, [productId, productQty])

    const addValue = () => {
        setValue(value + 1)
    }
    const subValue = () => {
        setValue(value - 1)
    }

    const updateValue = (e) => {
        setValue(e.target.value)
    }

    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center" style={{paddingLeft:'5vw'}}>
                    <img src={product?.image} className="img-fluid rounded-3"
                        style={{ width: '150px', height:'150px' }} alt="Book" />
                    <div className="flex-column ms-4">
                        <p className="mb-2">{product?.description?.substring(0,30)}</p>
                        <p className="mb-0">{product?.description?.substring(30,60)}</p>
                    </div>
                </div>
            </th>
            <td className="align-middle" style={{paddingRight:'5vw'}}>
                <div className="d-flex flex-row">
                    <button style={{ border: 'none' }} onClick={(e) => { addValue(); updateCart(e, product._id, value + 1) }} >+</button>
                    <input className="form-control text-center mx-3" id="inputQuantity" type="num" value={value} style={{ maxWidth: '3rem' }} onChange={updateValue} min='0' disabled />
                    <button style={{ border: 'none' }} onClick={(e) => { subValue(); updateCart(e, product._id, value - 1) }}>-</button>
                </div>
            </td>
            <td className="align-middle" style={{paddingRight:'5vw'}}>
                <p className="mb-0" style={{ fontWeight: 500 }}>₹ {product?.discountPrice}</p>
            </td>
        </tr>
    )
}

export default CartProduct
