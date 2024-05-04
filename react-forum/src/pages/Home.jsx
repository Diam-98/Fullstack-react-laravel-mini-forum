import React, { useEffect, useState } from 'react'
import './home.css'
import FeedCard from '../components/cards/FeedCard'
import { QuestionApi } from '../api/QuestionApi'
import { Spin, message } from 'antd'

const Home = () => {

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    getAllQuestions()
  },[])

  const getAllQuestions = () => {
    QuestionApi.getAllQuestion().then((response)=>{
      console.log(response);
      setQuestions(response.data.data)
      setLoading(false)
    }).catch((error)=>{
      message.error("Vous devez d'abbord vous connecter")
      setLoading(false)
    })
  }

  return (
    <section className='feed-page'>
        { loading == true ? (
            <Spin size='large'/>
          ) : (
            questions.map((item)=>(
              <FeedCard item={item} key={item.id}/>
            ))
          )
        }
      
    </section>
  )
}

export default Home
