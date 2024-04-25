import React, { useContext } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { productContext } from '../contexts/ProductContext'
import {  useLocation } from 'react-router-dom'
import ProductCard from './ProductCard'

const Search = () => {
  const ProductContext = useContext(productContext)
  const location = useLocation()

  const { products } = ProductContext
  const query = location.state

  return (
    <>
      <Navbar />
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

            {products?.length > 0 && products?.map((product) => {
              if (product?.category?.toLowerCase()?.includes(query?.toLowerCase()) || product?.description?.toLowerCase()?.includes(query?.toLowerCase())) {
                return (
                  <ProductCard product={product} key={product._id}/>
                )
              }
              else{
                return(
                  <div style={{display:'none'}}></div>
                )
              }
            })}

          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Search
