import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { UserContext } from '../contexts/UserContext'
import CartProduct from './CartProduct'
import { getRequest, url } from '../utils/services'
import { Link } from 'react-router-dom'

const Cart = () => {

  const userContext = useContext(UserContext)
  const { cart } = userContext

  const [grandTotal, setGrandTotal] = useState(0)

  useEffect(() => {
  
    const fetchPromises = cart?.productInfo?.map(async(e)=>{ 
        let res = await getRequest(`${url}/product/getproduct/${e.productId}`)
        return e?.productQty * res?.discountPrice
    })

    if(fetchPromises){
      Promise.all(fetchPromises).then((prices)=>{
        const total = prices?.reduce((acc, price)=> acc + price, 0)
        setGrandTotal(total)
      })
    }

  }, [cart])
  
  
  return (
    <>
      <Navbar />
      <section className="h-100 h-custom my-4">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="h5" style={{paddingLeft:'20vw'}}>Shopping Cart</th>
                      <th scope="col" style={{paddingLeft:'30px'}}>Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart?.productInfo?.map((product) => {
                      return (
                        <CartProduct productId={product.productId} productQty={product.productQty} key={product.productId}/>
                      )
                    })}

                  </tbody>
                </table>
              </div>

              <div className="card shadow-2-strong mb-5 mb-lg-0 mt-4" style={{ borderRadius: '16px' }}>
                <div className="card-body p-4">

                  <div className="row">
                    <div className="col-md-6 col-lg-4 col-xl-3 mb-4 mb-md-0">
                      <form>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel1v"
                              value="" aria-label="..." />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Credit
                              Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row pb-3">
                          <div className="d-flex align-items-center pe-2">
                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel2v"
                              value="" aria-label="..." />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-visa fa-2x fa-lg text-dark pe-2"></i>Debit Card
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-row">
                          <div className="d-flex align-items-center pe-2">
                            <input className="form-check-input" type="radio" name="radioNoLabel" id="radioNoLabel3v"
                              value="" aria-label="..." />
                          </div>
                          <div className="rounded border w-100 p-3">
                            <p className="d-flex align-items-center mb-0">
                              <i className="fab fa-cc-paypal fa-2x fa-lg text-dark pe-2"></i>PayPal
                            </p>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-6">
                      <div className="row">
                        <div className="col-12 col-xl-6">
                          <div data-mdb-input-init className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                              placeholder="John Smith" />
                            <label className="form-label" htmlFor="typeName">Name on card</label>
                          </div>

                          <div data-mdb-input-init className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="typeExp" className="form-control form-control-lg" placeholder="MM/YY"
                              size="7" minLength="7" maxLength="7" />
                            <label className="form-label" htmlFor="typeExp">Expiration</label>
                          </div>
                        </div>
                        <div className="col-12 col-xl-6">
                          <div data-mdb-input-init className="form-outline mb-4 mb-xl-5">
                            <input type="text" id="" className="form-control form-control-lg" siez="17"
                              placeholder="1111 2222 3333 4444" minLength="19" maxLength="19" />
                            <label className="form-label" htmlFor="typeText">Card Number</label>
                          </div>

                          <div data-mdb-input-init className="form-outline mb-4 mb-xl-5">
                            <input type="password" id="typeText" className="form-control form-control-lg"
                              placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3" />
                            <label className="form-label" htmlFor="typeText">Cvv</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-xl-3">
                      <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                        <p className="mb-2">Subtotal</p>
                        <p className="mb-2">₹ {grandTotal}</p>
                      </div>

                      <div className="d-flex justify-content-between" style={{ fontWeight: 500 }}>
                        <p className="mb-0">Shipping</p>
                        <p className="mb-0">₹ 200</p>
                      </div>

                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-4" style={{ fontWeight: 500 }}>
                        <p className="mb-2">Total (tax included)</p>
                        <p className="mb-2">₹ {grandTotal + 200}</p>
                      </div>

                      <Link to='/checkout' style={{textDecoration:'none', color:'white'}}>
                      <button type="button" className="btn btn-dark btn-lg">
                        <div className="d-flex justify-content-between">
                          Checkout ₹
                          <span> {grandTotal + 200}</span>
                        </div>
                      </button>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Cart
