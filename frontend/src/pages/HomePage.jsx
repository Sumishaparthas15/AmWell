import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../components/Home/Home'
import About from '../components/About/About'
import Department from '../components/department/Department'
import Review from '../components/Review/Review'
import Hospital from '../components/Hospital/Hospital'


const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Home />
        <About/>
        <Department />
        <Hospital/>
        
        
    </div>
  )
}

export default HomePage