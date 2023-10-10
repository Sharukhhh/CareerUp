import React from 'react'
interface resumeProps{
    resumeUrl : any;
}

const ResumeModal: React.FC<resumeProps> = ({resumeUrl}) => {
  return (
    <>
        <div className='fixed z-50 inset-0 overflow-y-auto'>
            <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                    <div className='absolute inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm'>
                        <iframe
                        title='Resume'
                        className='w-full h-full'
                        src={URL.createObjectURL(resumeUrl)}>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ResumeModal