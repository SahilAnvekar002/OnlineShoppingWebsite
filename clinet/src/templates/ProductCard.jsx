import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { Link } from 'react-router-dom'

function ProductCard(props) {

    const userContext = useContext(UserContext)
    const { user, cart, updateCart } = userContext
    
    const [value, setValue] = useState('')

    const { product } = props

    useEffect(() => {
        // eslint-disable-next-line
        cart?.productInfo?.map((element)=>{
            if(element.productId === product._id){
                setValue(element.productQty)
            }
        })
        // eslint-disable-next-line 
    }, [cart])
    

    const getRating = (rating) => {
        let temp = []
        for (let index = 0; index < rating; index++) {
            temp.push(index)
        }
        return temp
    }

    const updateValue =(e)=>{
        setValue(e.target.value)
    }

    const addValue=()=>{
        setValue(value+1)
    }
    const subValue=()=>{
        setValue(value-1)
    }

    const preventDefault =(e)=>{
        e.preventDefault()
    }

    const isProductPresent = cart?.productInfo?.some((element) => element.productId === product?._id);

    return (
        <Link className="col mb-5" style={{ cursor: 'pointer', textDecoration: 'none', width:'17vw', margin:'0 20px', padding:'0' }} to={`/product/${product?._id}`} state={product}>
            <div className="card h-100">
                {product?.discountPrice < product?.marketPrice && <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>}
                <img className="card-img-top" src={product?.image} alt="Product" height='268px' />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{product?.description.substring(0, 18)}</h5>
                        <div className="d-flex justify-content-center small text-warning mb-2">

                            {getRating(product?.rating).map((rating) => {
                                return (
                                    <div className="bi-star-fill" key={rating}></div>
                                )
                            })}

                        </div>
                        {product?.discountPrice < product?.marketPrice && <span className="text-muted text-decoration-line-through mx-2">₹{product?.marketPrice}</span>}
                        ₹{product?.discountPrice}
                    </div>
                </div>
                {user &&
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    {isProductPresent ?
                        <div className='d-flex justify-content-center'>
                            <button style={{ border: 'none' }} onClick={(e)=>{addValue(); updateCart(e, product._id, value+1)}} >+</button>
                            <input className="form-control text-center mx-3" id="inputQuantity" type="num" value={value} style={{ maxWidth: '3rem' }}  onChange={updateValue} onClick={preventDefault} min='0' disabled/>
                            <button style={{ border: 'none' }} onClick={(e)=>{subValue(); updateCart(e, product._id, value-1)}}>-</button>
                        </div>
                        :
                        <div className="text-center"><button className="btn btn-outline-dark mt-auto" onClick={(e)=>{preventDefault(e); updateCart(e, product._id, 1)}}>Add to cart</button></div>
                    }
                </div>}

            </div>
        </Link>
    )
}

export default ProductCard
