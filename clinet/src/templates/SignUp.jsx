import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const SignUp = () => {

  const userContext = useContext(UserContext)
  const {signupInfo, updateSignupInfo, userSignup, userError, setUserError} = userContext
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
          <h2 className='mb-4'>Create an Account</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="username" className="form-control" id="username" value={signupInfo?.username} onChange={(e) => updateSignupInfo({
              ...signupInfo, username: e.target.value
            })} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={signupInfo?.email} onChange={(e) => updateSignupInfo({
              ...signupInfo, email: e.target.value
            })} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={signupInfo?.password} onChange={(e) => updateSignupInfo({
              ...signupInfo, password: e.target.value
            })} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" value={signupInfo?.cpassword} onChange={(e) => updateSignupInfo({
              ...signupInfo, cpassword: e.target.value
            })} />
          </div>
          <div >Already have an account? <Link to='/login'>Click here</Link> to Log into your account</div>
          <button type="submit" className="btn btn-dark mt-3" onClick={(e)=>{userSignup(e); checkAlert()}}>Signup</button>
        </form>
      </div>
    </>
  )
}

export default SignUp
