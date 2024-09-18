import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {
    const data = useSelector(state=>state.authuser)
    const [isAuth,setIsAuth] = useState(null)
    useEffect(()=>{
        if(data.isValid){
            setIsAuth(data.isValid)
            return;            
        }else{
            setIsAuth(data.isValid)
        }
    },[])
    if(isAuth === null){
        return <h1>Loading...</h1>
    }
  return isAuth?<Navigate to = "/dashboard"/>:<Outlet/>
}

export default PublicRoutes