import React from 'react'
import Navbar from './Navbar'
import Img1 from "../assets/Images/children1.png"
import Img3 from "../assets/Images/children2.png"
import Img2 from "../assets/Images/mom_holding_child.png"

function Hero() {
  return (
    <div className='relative bg-[#f9d7ea]'>
        <Navbar/>
        <div className='font-poppins text-centerpx-4 pt-16 pb-10 items-center text-black h-[80vh]'>
            <div className=' max-w-3xl mx-auto text-center'>
                <h1 className='text-4xl font-semibold'>Fundraising for  <span className='text-primary'>Women and <br/> Children</span> With Health Challenges</h1>
                <p className='my-4'>Empowering women and children in need, help provide essential medical care, resources <br/> and support creating a healthier future for those facing critical health challenges.</p>
                <div className='space-x-3'>
                    <button className='rounded-md bg-[#666666] px-3 py-1 hover:bg-transparent hover:border hover:border-white'>Create A Campaign</button>
                    <button className='rounded-md bg-[#D7499A] px-3 py-1 hover:bg-transparent hover:border hover:border-white'>Donate Now</button>
                </div>
            </div>
            
        </div>
        <div className=' absolute -bottom-50 -right-10 -left-10 flex justify-evenly text-center text-black w-4/5 m-auto'>
            <div>
                <img src={Img1} alt='Image of children' />
                <div className='border border-white bg-white rounded-bl-2xl pt-5 pb-3'>
                    <h3 className='text-3xl'>38%</h3>
                    <p className=''>Monthly Donation</p>
                </div>
            </div>
            {/* <div className='border-r-2 border-slate-400'></div> */}
            <div className='text-center'>
                <img src={Img2} />
                <div className='border border-white bg-white pt-5 pb-3'>
                    <h3 className='text-3xl'>1K+</h3>
                    <p>Successful Treatments</p>
                </div>
            </div>
            <div>
                <img src={Img3} />
                <div className='border border-white bg-white rounded-br-2xl pt-5 pb-3'>
                    <h3 className='text-3xl'>1500</h3>
                    <p>International Donors</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero