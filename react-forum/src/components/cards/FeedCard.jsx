import React, { useState } from 'react'
import profile from '../../assets/pilote.jpg'
import {Button, Form, Input, message} from 'antd'
import {EditOutlined} from '@ant-design/icons'
import './feed-card.css'
import ResponseCard from './ResponseCard'
import { QuestionApi } from '../../api/QuestionApi'

const FeedCard = ({item}) => {

    const [form] = Form.useForm()
    const [clickResponse, setClickResponse] = useState(false)
    const [selectedQuestionId, setSelectedQuestionId] = useState(null)
    const [clickResponseList, setClickResponseList] = useState(false)
    const [loading, setLoading] = useState(false)


    const onFinish = (values) => {
        console.log(values);
        setLoading(true)
        QuestionApi.addResponse(values, selectedQuestionId).then((response)=>{
            setLoading(false)
            message.success("Reponse soumise avec succes")
        }).catch((error)=>{
            message.error("Impossible de repondre a la question ressayer")
            setLoading(false)
        })
    }

    const onFinishFailed = () => {
        message.error("Erreur: Remplissez tous les champs")
    }

    const showResponseForm = (id) => {
        setSelectedQuestionId(id)
        setClickResponse(!clickResponse)
    }

    const showResponseList = (id) => {
        setSelectedQuestionId(id)
        setClickResponseList(!clickResponseList)
    }

  return (
    <>
        <article className='feed'>
            <div className='card-top'>
                <h2>{item?.title}</h2>
                <div className='author'>
                    <img src={item?.author?.image} alt="author profile" />
                    <div className='author-infos'>
                        <span>{item?.author?.name}</span>
                        <p>@{item?.author?.pseudo}</p>
                    </div>
                </div>
            </div>
            <p>{item?.description}</p>
            <div className='card-bottom'>
                <Button type='link' className='card-bottom-btn' onClick={() => showResponseForm(item.id)}>
                    <EditOutlined/>
                    <span>Repondre</span>
                </Button>

                <Button type='link' onClick={() => showResponseList(item.id)}>
                    {item?.responses?.length} presonnes ont repondu
                </Button>
            </div>
        </article>
        {
           selectedQuestionId == item.id && clickResponse == true && (
                <div className='response-form'>
                    <Form
                        layout='vertical'
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'>
                            <Form.Item
                                label="Votre response"
                                name='description'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Entrez votre reponse'
                                    }
                                ]}>
                                    <Input.TextArea placeholder='Laisser votre reponse'/>
                            </Form.Item>
                            <Button  loading={loading} onClick={() => form.submit()}>Repondre</Button>
                    </Form>
                </div>
            )
        }

        {
            selectedQuestionId == item.id && clickResponseList == true && (
                <div className='response-list'>
                    {
                        item?.responses?.length > 0 ? (
                            item?.responses.map((response)=>(
                                <ResponseCard response={response} key={response.id}/>
                            ))
                        ) : (
                            <p>Pas de response pour cette question</p>
                        )
                    }
                    
                </div>
            )
        }
        
       
    </>
  )
}

export default FeedCard
