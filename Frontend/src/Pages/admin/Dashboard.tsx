import React from 'react'
import TopBar from '../../Components/admin/TopBar'

const Dashboard = () => {
  return (
    <>
        <TopBar />

        <div className='flex flex-wrap justify-center mt-10'>
            <div className='w-full sm:w-1/2 md:w-1/3 p-4'>
                <div className='bg-[#ebedf1] border-4 border-double
                border-black rounded-lg p-8 shadow-md'>
                    card1
                </div>
            </div>

            <div className='w-full sm:w-1/2 md:w-1/3 p-4'>
                <div className='bg-[#ebedf1] border-4 border-double 
                border-black rounded-lg p-8 shadow-md'>
                    card1
                </div>
            </div>

            <div className='w-full sm:w-1/2 md:w-1/3 p-4'>
                <div className='bg-[#ebedf1] border-4 
                border-black border-double rounded-lg p-8 shadow-md'>
                    card1
                </div>
            </div>

            <div className='w-full sm:w-1/2 md:w-1/3 p-4 mt-4'>
                <div className='bg-[#ebedf1] border-4 border-double
                border-black rounded-lg p-8 shadow-md'>
                    card1
                </div>
            </div>
        </div>
    </>
  )
}

export default Dashboard