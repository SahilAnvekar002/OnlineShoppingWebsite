import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../contexts/AdminContext'

const AdminLogin = () => {

  const context = useContext(AdminContext)
  const { adminInfo, updateAdminInfo, adminLogin, adminError } = context

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if(adminError){
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }
  }, [adminError])

  const checkAlert = ()=>{
    if(adminError){
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }
  }
  
  return (
    <>
      {adminError && isVisible ?<div className="alert alert-danger" role="alert" >
        {adminError}
      </div>: <div className="alert alert-danger" role="alert" style={{visibility:'hidden'}}>
        This is fake string
      </div>}

      <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <form style={{ width: '40vw' }}>
          <h2 className='mb-4'>Admin Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="username" className="form-control" id="username" value={adminInfo?.username} onChange={(e) => updateAdminInfo({
              ...adminInfo, username: e.target.value
            })} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={adminInfo?.password} onChange={(e) => updateAdminInfo({
              ...adminInfo, password: e.target.value
            })} />
          </div>
          <button type="submit" className="btn btn-dark" onClick={(e)=>{adminLogin(e); checkAlert()}}>Login</button>
        </form>
      </div>
    </>
  )
}

export default AdminLogin
