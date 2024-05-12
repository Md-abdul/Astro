import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Register } from '../Pages/Register'
import { Edit } from '../Pages/Edit'
export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/edit/:_id' element={<Edit/>}/>
    </Routes>
    </>
  )
}
