import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const LandCompo = () => {
  return (
    <div>
        <div className='bg-[#0D1717] rounded-2xl py-[40px] pt-[80px]'>
        <h1 className='max-w-[172px] text-green-500 mx-auto mt-[20px] font-medium text-3xl'>Blog Insight.</h1>

            <div className='grid  grid-col-1 place-items-center gap-y-[40px] mt-4 md:grid-cols-2 lg:grid-cols-3 gap-x-[50px]'>
                <section className='max-w-[300px]'>
                    <h3 className='font-bold text-stone-400 text-2xl mb-3'>Revolutionizing Supply Chain with Advanced Technologies. </h3>
                    <p className='text-white'>Maximize profitability with strategic insights into inventory management and innovative warehouse solutions shared in this post. </p>
                    <div className='flex gap-1 mt-4 text-white font-bold'><div className='size-6 bg-gray-400 rounded-[50%] border-2 border-green-500'>
                        <LazyLoadImage 
                           src='../images/img_3.jpg' 
                           effect="blur"
                           height={24}
                           style={{height:"100%"}}
                           alt="three" className='w-full h-full rounded-[50%]'
                           />
                           </div>
                           <p>Simon James</p>
                           
                           </div>
                </section>
                <section className='max-w-[300px]'>
                    <h3 className='font-bold text-stone-400 text-2xl mb-3'>Innovative Hardware for Seamless Logistics Management.</h3>
                    <p className='text-white'>Explore hardware solutions tailored for seamless logistics and supply chain management. </p>
                    <div className='flex gap-1 mt-4 text-white font-bold'><div className='size-6 bg-gray-400 rounded-[50%] border-2 border-green-500'>
                    <LazyLoadImage 
                           src='../images/img_2.jpg' 
                           effect="blur"
                           height={24}
                           style={{height:"100%"}}
                           alt="three" className='w-full h-full rounded-[50%]'
                           />
                        </div><p>Jonathan Olertey</p></div>
                </section>
                <section className='max-w-[300px]'>
                   <h3 className='font-bold text-stone-400 text-2xl mb-3'>Maximizing Efficiency in Modern Supply Chain Strategies. </h3>
                   <p className='text-white'>Discover logistics optimization tips and tools to enhance efficiency, reduce costs, and streamline your supply chain operations. </p>
                   <div className='flex gap-1 mt-4 text-white font-bold'><div className='size-6 bg-gray-400 rounded-[50%] border-2 border-green-500'>
                   <LazyLoadImage 
                           src='../images/img_1.jpg' 
                           effect="blur"
                           height={24}
                           style={{height:"100%"}}
                           
                           alt="three" className='w-full h-full rounded-[50%]'
                           />
                    </div><p>Nicholas Asamoah</p></div>
                </section>
            </div>
            </div>


            
            <section className='bg-green-100 py-[80px]'>
            <h2 className='font-medium text-4xl  max-w-[360px] mx-auto md:max-w-[400px] lg:max-w-[400px]'>Connect with Our Proficient Supply Chain Professionals. </h2>

            <img src='../images/connect.png' alt='connect' className='mx-auto mt-5'></img>

            <div className='flex gap-2 flex-wrap justify-around mt-8 '>
                <section className='max-w-[300px]'>
                    <img src='../images/img_1.jpg' alt='1' className='rounded-3xl w-full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>Patawah Andrew</h6>
                    <h3>Supply Chain Expert</h3>
                </section>
                <section  className='max-w-[300px]'>
                    <img src='../images/img_2.jpg' alt='2' className='rounded-3xl w-full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>David Darko</h6>
                    <h3>Head of Logistics</h3>
                </section>
                <section  className='max-w-[300px]'>
                    <img src='../images/img_3.jpg' alt='3' className='rounded-3xl -full h-[300px]'></img>
                    <h6 className='font-medium text-lg mt-2 mb-2'>Micheal Dei</h6>
                    <h3>Project Manager</h3>
                </section>
            </div>
            </section>


            <footer className=' flex justify-around  bg-[#0D1717]  rounded-t-2xl '>
                <h4 className='font-medium text-sm text-white ml-1 sm:ml-1'>©Copyright ©2024 Supply Chain Solutions, Inc. All rights reserved. </h4>
                <div className='font-medium text-sm text-white mr-1 lg:mr-0'>Developed by Micheal Dei, David Nii Darko and Patawah Andrew.</div>
            </footer>
    </div>
  )
}

export default LandCompo