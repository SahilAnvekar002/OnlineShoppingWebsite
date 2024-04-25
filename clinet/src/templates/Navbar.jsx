import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {UserContext} from '../contexts/UserContext'

function Navbar() {

    const userContext = useContext(UserContext)
    const { user, cart, logout } = userContext

    const [query, setQuery] = useState("")
    const [cartItems, setCartItems] = useState(0)

    useEffect(() => {

        let temp = 0
        cart?.productInfo?.map(e => temp += e.productQty)
        setCartItems(temp)

    }, [cart])


    const updateQuery = (e) => {
        setQuery(e.target.value)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ height: '80px' }}>
            <div className="container px-4 px-lg-5">
                <Link className="navbar-brand" to='/'>E-Shopping</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li className="nav-item"><Link className="nav-link active" aria-current="page" to='/'>Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                        {user ? <li className="nav-item"><Link className="nav-link" to="/login" onClick={logout}>Logout</Link></li>
                        :<li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
                        <form className="d-flex" role="search" style={{ marginLeft: '8vw' }}>
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: '25vw' }} value={query} onChange={(e) => updateQuery(e)} />
                            <Link to={`/search/${query}`} style={{ textDecoration: 'none' }} state={query}>
                                <button className="btn btn-outline-dark">Search</button>
                            </Link>
                        </form>
                    </ul>

                    {user &&<form className="d-flex">
                        <Link className="btn btn-outline-dark" to='/cart'>
                            <i className="bi-cart-fill me-1"></i>
                            Cart
                            <span className="badge bg-dark text-white ms-1 rounded-pill">{cartItems}</span>
                        </Link>
                    </form>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
