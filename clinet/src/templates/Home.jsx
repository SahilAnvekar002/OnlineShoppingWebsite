import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import Navbar from './Navbar'
import Footer from './Footer'
import { productContext } from '../contexts/ProductContext'
import ProductCard from './ProductCard'

const Home = () => {

  // eslint-disable-next-line
  const userContext = useContext(UserContext)
  const ProductContext = useContext(productContext)
  // eslint-disable-next-line
  const { user } = userContext
  const { products } = ProductContext

  const [currentIndexElectronics, setCurrentIndexElectronics] = useState(0)
  const [currentIndexClothing, setCurrentIndexClothing] = useState(0)
  const [currentIndexFurniture, setCurrentIndexFurniture] = useState(0)
  const [electronics, setElectronics] = useState([])
  const [clothing, setClothing] = useState([])
  const [furniture, setFurniture] = useState([])

  useEffect(() => {

    setElectronics(products?.filter(e => e.category === 'Electronics'))
    setClothing(products?.filter(e => e.category === 'Clothing'))
    setFurniture(products?.filter(e => e.category === 'Furniture'))

  }, [products])

  const nextElectronicSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentIndexElectronics(nextIndex);
  };

  const prevElectronicSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentIndexElectronics(prevIndex);
  };

  const nextClothingSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentIndexClothing(nextIndex);
  };

  const prevClothingSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentIndexClothing(prevIndex);
  };

  const nextFurnitureSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentIndexFurniture(nextIndex);
  };

  const prevFurnitureSlide = (productsLength, currentIndex) => {
    const lastIndex = Math.ceil(productsLength / 4) - 1;
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentIndexFurniture(prevIndex);
  };

  return (
    <>
      <Navbar />
      <header className="bg-dark py-5" style={{ height: '60vh', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container px-4 px-lg-5 my-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70%' }}>
          <div className="text-center text-white">
            <h1 className="display-4 fw-bolder">Shop in style</h1>
            <p className="lead fw-normal text-white-50 mb-0">We provide products of top brands at best price</p>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {electronics?.length > 0 && electronics?.slice(currentIndexElectronics * 4, (currentIndexElectronics + 1) * 4)?.map((product) => {
              return (       
                  <ProductCard product={product} key={product._id}/>  
              )
            })}
            </div>

            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {clothing?.length > 0 && clothing?.slice(currentIndexClothing * 4, (currentIndexClothing + 1) * 4)?.map((product) => {
              return (
                <ProductCard product={product} key={product._id}/>
              )
            })}
            </div>

            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {furniture?.length > 0 && furniture?.slice(currentIndexFurniture * 4, (currentIndexFurniture + 1) * 4)?.map((product) => {
              return (
                <ProductCard product={product} key={product._id}/>
              )
            })}
            </div>
          
        </div>
      </section>
      <i className="fa-solid fa-angle-right" style={{ position: 'absolute', top: `${user ? '120vh': '110vh'}`, right: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => nextElectronicSlide(electronics?.length, currentIndexElectronics)}></i>
      <i className="fa-solid fa-angle-left" style={{ position: 'absolute', top: `${user ? '120vh': '110vh'}`, left: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => prevElectronicSlide(electronics?.length, currentIndexElectronics)}></i>

      <i className="fa-solid fa-angle-right" style={{ position: 'absolute', top: `${user ? '190vh': '180vh'}`, right: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => nextClothingSlide(clothing?.length, currentIndexClothing)}></i>
      <i className="fa-solid fa-angle-left" style={{ position: 'absolute', top: `${user ? '190vh': '180vh'}`, left: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => prevClothingSlide(clothing?.length, currentIndexClothing)}></i>

      <i className="fa-solid fa-angle-right" style={{ position: 'absolute', top: `${user ? '260vh': '250vh'}`, right: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => nextFurnitureSlide(furniture?.length, currentIndexFurniture)}></i>
      <i className="fa-solid fa-angle-left" style={{ position: 'absolute', top: `${user ? '260vh': '250vh'}`, left: '50px', fontSize: '30px', cursor: 'pointer' }} onClick={() => prevFurnitureSlide(furniture?.length, currentIndexFurniture)}></i>
      <Footer />
    </>
  )
}

export default Home
