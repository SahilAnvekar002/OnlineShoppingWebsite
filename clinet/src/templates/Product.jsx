import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { productContext } from '../contexts/ProductContext'
import Footer from './Footer'
import { UserContext } from '../contexts/UserContext'
import ProductCard from './ProductCard'
import Review from './Review'
import { deleteRequest, getRequest, postRequest, url } from '../utils/services'

const Product = () => {

  const location = useLocation()
  const product = location.state
  const ProductContext = useContext(productContext)
  const userContext = useContext(UserContext)

  const { user, cart, updateCart } = userContext
  const { products } = ProductContext
  const [relatedProducts, setRelatedProducts] = useState([])
  const [value, setValue] = useState('')
  const [reviewInfo, setReviewInfo] = useState({
    title: '',
    description: '',
    rating: '',
    userId: '',
    productId: ''
  })
  const [reviews, setReviews] = useState([])

  useEffect(() => {

    const getReviews = async () => {
      const response = await getRequest(`${url}/review/getproductreviews/${product?._id}`)
      setReviews(response)
    }

    getReviews()

  }, [product])


  useEffect(() => {

    window.scroll(0, 0)
    setRelatedProducts(products?.filter(e => e?.category === product?.category && e?._id !== product?._id))

    // eslint-disable-next-line
    cart?.productInfo?.map((element) => {
      if (element.productId === product._id) {
        setValue(element.productQty)
      }
    })

    // eslint-disable-next-line
  }, [cart, products, location.pathname])

  useEffect(() => {

    setReviewInfo({ ...reviewInfo, userId: user?._id, productId: product?._id })

    // eslint-disable-next-line
  }, [user, product])


  const getRating = (rating) => {
    let temp = []
    for (let index = 0; index < rating; index++) {
      temp.push(index)
    }
    return temp
  }

  const updateValue = (e) => {
    setValue(e.target.value)
  }

  const addValue = () => {
    setValue(value + 1)
  }
  const subValue = () => {
    setValue(value - 1)
  }

  const preventDefault = (e) => {
    e.preventDefault()
  }

  const isProductPresent = cart?.productInfo?.some((element) => element.productId === product?._id);

  const updateReviewInfo = (info) => {
    setReviewInfo(info)
  }

  const addReview = async (e) => {
    e.preventDefault()
    // eslint-disable-next-line
    const response = await postRequest(`${url}/review/add`, reviewInfo)

    setReviewInfo({
      title: '',
      description: '',
      rating: ''
    })

    const data = await getRequest(`${url}/review/getproductreviews/${product?._id}`)
    setReviews(data)
  }

  const editReview = async (info, reviewId) => {
    // eslint-disable-next-line
    const response = await postRequest(`${url}/review/update/${reviewId}`, info)

    const data = await getRequest(`${url}/review/getproductreviews/${product?._id}`)
    setReviews(data)
  }

  const deleteReview = async (reviewId) => {
    // eslint-disable-next-line
    const response = await deleteRequest(`${url}/review/delete/${reviewId}`)

    const data = await getRequest(`${url}/review/getproductreviews/${product?._id}`)
    setReviews(data)
  }

  return (
    <>
      <Navbar />
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product?.image} alt="Product" height='600px' width='600px' /></div>
            <div className="col-md-6">
              <div className="display-6 fw-bolder mb-4">{product?.category}</div>
              <span style={{ fontSize: '24px', lineHeight: '32px', fontWeight: '400' }}>{product?.description}</span>

              <div className="d-flex small text-warning my-3">
                {getRating(product?.rating).map((rating) => {
                  return (
                    <div className="bi-star-fill" key={rating} style={{ marginRight: '3px' }}></div>
                  )
                })}
              </div>

              <div className="fs-5 mb-3 mt-3">
                {product?.discountPrice < product?.marketPrice && <span className="text-decoration-line-through mx-2">₹{product?.marketPrice}</span>}
                <span>₹{product?.discountPrice}</span>
              </div>

              {user &&
                <div>
                  {isProductPresent ?
                    <div className="d-flex">
                      <button style={{ border: 'none' }} onClick={(e) => { addValue(); updateCart(e, product._id, value + 1) }} >+</button>
                      <input className="form-control text-center mx-3" id="inputQuantity" type="num" value={value} style={{ maxWidth: '3rem' }} onChange={updateValue} onClick={preventDefault} min='0' disabled />
                      <button style={{ border: 'none' }} onClick={(e) => { subValue(); updateCart(e, product._id, value - 1) }}>-</button>
                    </div> :
                    <button className="btn btn-outline-dark mt-auto" onClick={(e) => { preventDefault(e); updateCart(e, product._id, 1) }}>Add to cart</button>
                  }
                </div>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-3 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {relatedProducts?.length > 0 && relatedProducts?.map((product) => {
              return (
                <ProductCard product={product} key={product?._id} />
              )
            })}
          </div>
        </div>
      </section>

      {user && !reviews?.some((element) => element.userId === user?._id) &&
      <section className="py-4 bg-light">
        <div className="container px-4 px-lg-5 mt-1">
          <h2 className="fw-bolder mb-3">Add a Review</h2>
          <div className="mb-3" style={{ width: '40vw' }}>
            <input type="text" className="form-control shadow-none" id='title' placeholder="Title" style={{ border: 'none' }} value={reviewInfo.title} onChange={(e) => updateReviewInfo({ ...reviewInfo, title: e.target.value })} />
          </div>
          <div className="mb-3" style={{ width: '40vw' }}>
            <textarea className="form-control shadow-none" id="review" rows="4" style={{ resize: 'none', border: 'none' }} placeholder='Description' value={reviewInfo.description} onChange={(e) => updateReviewInfo({ ...reviewInfo, description: e.target.value })}></textarea>
          </div>
          <div className="mb-3" style={{ width: '40vw' }}>
            <input type="number" className="form-control shadow-none" id='rating' placeholder="Rating" style={{ border: 'none' }} value={reviewInfo.rating} onChange={(e) => updateReviewInfo({ ...reviewInfo, rating: e.target.value })} />
          </div>
          <button className='btn btn-outline-dark mt-2 mb-4' type='submit' onClick={addReview}>Post Review</button>
        </div>
      </section>}

      <section className="py-4 bg-light">
        <div className="container px-4 px-lg-5 mt-1 mb-5">
          <h2 className="fw-bolder mb-5">Product Reviews</h2>
          {reviews?.length > 0 && reviews?.map((review) => {
            return (
              <Review key={review._id} review={review} editReview={editReview} deleteReview={deleteReview}/>
            )
          })}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Product
