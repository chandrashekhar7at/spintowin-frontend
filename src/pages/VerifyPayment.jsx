import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { BaseUrl } from '../utils/Urls'
import { setSpinLeft, setTotalScore } from '../redux/userinfoSlice'
import { useNavigate } from 'react-router-dom'

const VerifyPayment = () => {
    const saveddata = useSelector(state=>state.authuser)
    const amount = saveddata.amount
    const id = saveddata.id
    const navigate = useNavigate()

    const dispatch = useDispatch()
    useEffect(()=>{
        if(amount>=50){
            const saveinfo = async ()=>{
                try {
                    const result = await axios.post(`${BaseUrl}/api/updateInfoById/${id}`,{amount},{
                        withCredentials:true,
                        credentials:true
                    })
                    if(result.data.status){
                        // dispatch(setTotalScore(result.data.scoreee))
                        dispatch(setSpinLeft(result.data.data.spinleft))
                        navigate('/profile')
                        return;
                    }
                    navigate('/addmoney')
                } catch (error) {
                }
            }
            saveinfo()
        }
    },[amount])
    return (
    <h1>Loading...</h1>
  )
}

export default VerifyPayment