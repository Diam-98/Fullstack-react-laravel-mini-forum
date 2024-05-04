import React, { useState } from 'react'
import './header.css'
import profile from "../../assets/pilote.jpg"
import {LogoutOutlined} from '@ant-design/icons'
import AuthModals from '../modals/AuthModals'
import { UserApi } from '../../api/UserApi'

const Header = ({user, setUser, setToken}) => {

  const [open, setOpen] = useState(false);

  const openAuthModal = () => {
    setOpen(true)
  }

  const logout  = () => {
    UserApi.logout().then((response)=>{
      console.log(response);
      setUser({})
      setToken(null)
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <header>
      <div className='logo'>
        <h1>Forum</h1>
      </div>
      <div className='right'>
        {
          Object.keys(user).length != 0 ? (
            <>
              <img src={user?.image} alt="Profile User" />
              <div className='user-info'>
                <div className='info'>
                  <span>{user?.name}</span>
                  <p>@{user?.pseudo}</p>
                </div>
              </div>
              <div className='logout' onClick={logout}>
                <LogoutOutlined/>
              </div>
            </>
          ) : (
            <div className='login' onClick={openAuthModal}>
              <LogoutOutlined/> Se connecter
            </div>
          )
        }
        
      </div>
      <AuthModals open={open} setOpen={setOpen}/>
    </header>
  )
}

export default Header
