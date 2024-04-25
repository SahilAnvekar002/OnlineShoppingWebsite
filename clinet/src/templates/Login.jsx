import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {

  const userContext = useContext(UserContext)
  const {userInfo, updateUserInfo, userError, userLogin, setUserError} = userContext
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if(userError){
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }
  }, [userError])

  const checkAlert = ()=>{
    if(userError){
      setIsVisible(true)
      setTimeout(() => {
        setIsVisible(false)
      }, 3000);
    }
    setUserError("")
  }

  return (
    <>
      {userError && isVisible ?<div className="alert alert-danger" role="alert" >
        {userError}
      </div>: <div className="alert alert-danger" role="alert" style={{visibility:'hidden'}}>
        This is fake string
      </div>}

      <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <form style={{ width: '40vw' }}>
          <h2 className='mb-4'>User Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="username" className="form-control" id="username" value={userInfo?.username} onChange={(e) => updateUserInfo({
              ...userInfo, username: e.target.value
            })} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={userInfo?.password} onChange={(e) => updateUserInfo({
              ...userInfo, password: e.target.value
            })} />
          </div>
          <div >Don't have an account? <Link to='/signup'>Click here</Link> to create an account</div>
          <button type="submit" className="btn btn-dark mt-3" onClick={(e)=>{userLogin(e); checkAlert()}}>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
