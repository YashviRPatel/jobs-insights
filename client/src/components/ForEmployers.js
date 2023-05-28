import React from 'react'
import Navbar from './Navbar'
import '../styles/ForEmployers.css'

function ForEmployers() {
  return (
    <div className='ForEmployers'>
      <div className="Navbar_container">
        <Navbar/>
      </div>
      <div className='ForEmployers_upper'>
        <div className='ForEmployers_upper_heading'>For Employers</div>
        <div className='ForEmployers_upper_subheading'>We help companies attract, hire, and retain top senior talent.</div>
      </div>
    </div>
  )
}

export default ForEmployers