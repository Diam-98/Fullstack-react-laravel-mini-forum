import React, { useEffect, useState } from 'react'
import FeedCard from '../../components/cards/FeedCard'
import { UserApi } from '../../api/UserApi'
import { message } from 'antd'

const Questions = () => {

  const [questions, setQuestions] = useState([])

  useEffect(()=>{
    getMyQuestions()
  },[])

  const getMyQuestions = () => {
    UserApi.getMyQuestions().then((response)=>{
      setQuestions(response.data.data)
      message.success("Donnee charge")
    }).catch((error)=>{
      message.error("Une erreur est surevenu")
    })
  }

  return (
    <section className='feed-page'>
        {
            questions.map((item)=>(
                <FeedCard item={item} key={item.id}/>
            ))
        }
      
    </section>
  )
}

export default Questions
