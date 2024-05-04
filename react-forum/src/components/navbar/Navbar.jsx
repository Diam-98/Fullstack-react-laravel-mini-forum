import React, { useEffect, useState } from 'react'
import {PlusOutlined} from '@ant-design/icons'
import './navbar.css'
import { menuItem } from '../../data'
import AddQuestionModal from '../modals/AddQuestionModal'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {

    const [isItemClicked, setIsItemClicked] = useState(null)
    const [openAddQuestionModal, setOpenAddQuestionModal] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()

    const handleMenuItemClicked = (item) => {
        setIsItemClicked(item.id)
        navigate(item.path)
    }

    const handleOpenModal = () => {
        setOpenAddQuestionModal(true)
    }

    useEffect(()=>{
        updateDimensions()

        window.addEventListener('resize', updateDimensions)

        return () => {
            window.removeEventListener('resize', updateDimensions)
        }
    }, [])

    const updateDimensions = () => {
        setIsMobile(window.innerWidth <= 620)
    }

  return (
    <nav className={isMobile ? 'mobile-nav' : 'widescreen-nav' }>
        <ul>
            <li className='add-question-btn' onClick={handleOpenModal}>
                <PlusOutlined/>
                Poser une Question
            </li>
            {
                menuItem.map((item)=>(
                    <li 
                        className={isItemClicked == item.id ? 'menu-item active' : 'menu-item'} 
                        key={item.id} 
                        onClick={() => handleMenuItemClicked(item)
                    }>
                        <div className='menu-icon'>{item.icon}</div>
                        <div className='menu-title'>{item.title}</div>
                    </li>
                ))
            }
            
        </ul>
        <AddQuestionModal open={openAddQuestionModal} setOpen={setOpenAddQuestionModal}/>
    </nav>
  )
}

export default Navbar
