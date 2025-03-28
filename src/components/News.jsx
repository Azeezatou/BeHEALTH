import React from 'react'
import {TiWarningOutline} from 'react-icons/ti'
import N1 from "../assets/Images/ImageN1.png"
import N2 from "../assets/Images/ImageN2.png"
import N3 from "../assets/Images/ImageN3.png"
import N4 from "../assets/Images/ImageN4.png"

function News() {
  return (
    <div className='bg-black text-white font-poppins pt-60 p-3'>
        <div className='grid grid-flow-col grid-rows-5 gap-2'>
            <div className='row-span-1'>
                <h2 className='mb-2 text-4xl text-primary'>Latest News</h2>
                <p className='text-xl'>Stay up-to-date with the latest developments, success stories and upcoming events. Your support is making a real difference, thank you!</p>
                <div className='rounded-lg bg-secondary text-white w-fit py-2 px-4 mt-5'>
                    <a href='' className='flex gap-1 items-center'> <TiWarningOutline className='text-primary'/> Urgent!!! Help Jasmir get a liver surgery within the next 50 days</a>
                </div>
            </div>
            <div className='row-span-2'>
                <img src={N1} alt='' className='w-2/3'/>
            </div>
            <div className='row-span-2'>
                <img src={N2} alt='' className='w-2/3'/>
            </div>
            <div className='col-span-1 row-span-2'>
                <img src={N3} alt='' className='w-2/3'/>
            </div>
            <div className='col-span-1 row-span-3'>
                <img src={N4} alt='' className='w-2/3'/>
            </div>
        </div>
    </div>
  )
}

export default News