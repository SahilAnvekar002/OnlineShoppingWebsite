import React, { useContext } from 'react'
import '../static/css/sidebar.css'
import { Link } from 'react-router-dom'
import { productContext } from '../contexts/ProductContext'

function SideBar(props) {

    const context = useContext(productContext)
    const {products} = context

  return (
    <div id="layoutSidenav" >
            <div id="layoutSidenav_nav" style={{position: 'fixed', height: '100%', width: '18vw'}}>
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" >
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <div className="sb-sidenav-menu-heading">Core</div>
                            <Link className="nav-link" to="/admin">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </Link>
                            <div className="sb-sidenav-menu-heading">Interface</div>
                            <Link className="nav-link collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Products
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse myclass" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion" style={{maxHeight:'300px', overflowY:'scroll'}}>
                                <nav className="sb-sidenav-menu-nested nav">
                                    {products?.length>0 && products?.map((product)=>{
                                        return(
                                            <Link className="nav-link" to={`/admin/updateproduct/${product._id}`} key={product._id} state={product}>
                                                {product?.description?.substring(0,25)}
                                            </Link>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {props.admin}
                    </div>
                </nav>
            </div>
            
        </div>
  )
}

export default SideBar
