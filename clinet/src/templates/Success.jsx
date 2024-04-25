import React from 'react'

function Success() {
    return (
        <div style={{textAlign:'center', padding:'40px 0' , background: '#EBF0F5', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div className="card" style={{padding:'60px', background:'white', borderRadius:'4px', boxShadow: '0 2px 3px #C8D0D8', display:'inline-block', margin: '0 auto'}}>
                <div style={{ borderRadius: '200px', height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                    <i style={{color: '#9ABC66', fontSize:'100px', lineHeight:'200px', marginLeft:'-15px'}} className="checkmark">✓</i>
                </div>
                <h1 style={{color: '#88B04B', fontWeight:900, marginBottom:'10px', fontSize:'40px'}}>Success</h1>
                <p style={{color: '#404F5E', fontSize:'20px', margin:0}}>We received your purchase request.<br /> we'll be in touch shortly!</p>
            </div>
        </div>
    )
}

export default Success
