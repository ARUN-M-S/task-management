import React  from 'react'
import Navbar from '../components/Navbar'

const Authlayout = ({children}:{readonly children:React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 '>
      {children}
    </div>
  )
}

export default Authlayout
