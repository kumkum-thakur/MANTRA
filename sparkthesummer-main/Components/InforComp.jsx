import Image from 'next/image'
import React from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
function InforComp() {
  useGSAP(()=>{
    gsap.from('.li',{
      stagger:0.5,
      duration:0.5,
      y:20,
      opacity:0,
      
    })
  },[])
  return (
    <div className='self-center w-9/12 py-4 mt-5 rounded-3xl shadow-2xl  flex flex-row gap-1 justify-around'>
       
            <ul className='text-2xl text-gray-800 font-semibold'>
              <li className='li'>M - Monitoring</li>
              <li className='li'>A - Analytics</li>
              <li className='li'>N - Navigating</li>
              <li className='li'>T - Treatment</li>
              <li className='li'>R - Risk</li>
              <li className='li'>A - Assessment</li>
            </ul>

            <Image src={'https://www.econlib.org/wp-content/uploads/2018/04/health-care-.jpg'} width={280} height={300} className='border-2 p-2 border-black self-center rounded-xl hover:rounded-3xl transition-all  duration-220' />
        </div>
  )
}

export default InforComp
