import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {IoMdClose} from 'react-icons/io';
import { axiosInstance } from '../../../api/axiosInstance';

interface ReportModalProps {
    visible : boolean;
    closeReportModal: () => void;
    postId : string | null;
}

const ReportModal : React.FC<ReportModalProps> = ({visible , closeReportModal, postId}) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const reportOptions = [
        'Spam',
        'Inappropriate Content',
        'Harassment',
        'Other',
    ];

    const handleOptionChange = (option : string) => {
        setSelectedOption(option);
    }

    const reportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!selectedOption || !postId){
            return toast.error('Please Specify the reason for report!');
        }

        axiosInstance.patch(`/report/${postId}`, {reason : selectedOption})
        .then((res) => {
            if(res.data.message){
                closeReportModal();
                toast.success(res.data.message);
            }

            if(res.data.error){
                toast.error(res.data.error);
            }
        }).catch((error) => console.log(error , 'error occured reporting')
        )
    }
  return (
    <>
    {visible && (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity'>
                <div className='absolute inset-0 bg-[#131313] bg-opacity-30 backdrop-blur-sm'>

                    <form onSubmit={reportSubmit}>
                    <div aria-modal = 'true' aria-labelledby='modal-headline'
                    className='inline-block align-bottom bg-primary rounded-lg text-left 
                    overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
                        <div className='flex justify-between px-6 pt-5 pb-2'>
                            <label htmlFor="" className='block font-medium text-xl text-ascent-1 text-left'>
                                Report this post?
                            </label>
                            <button className='text-ascent-1 cursor-pointer' onClick={closeReportModal}>
                                <IoMdClose size={22} />
                            </button>
                        </div>

                        <div className='px-6 pb-4 border-t-2 rounded-md'>
                            <p className='text-md font-semibold mt-3'>
                                Select a reason for reporting: 
                            </p>
                            <div className='mt-4'>
                                {reportOptions.map((option : string) => {
                                    return (
                                        <div key={option} className='flex items-center'>
                                            <input
                                            type='radio'
                                            id={option}
                                            name='reason'
                                            value={option}
                                            checked={selectedOption === option}
                                            onChange={() => handleOptionChange(option)}
                                            className='mr-5 mb-2'
                                            />
                                        <label className='mb-2 text-lg' htmlFor={option}>{option}</label>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div className='px-2 py-3 flex justify-center'>
                        <button type='submit' 
                        className='bg-[#e65858] text-white px-4 py-2 rounded-full hover:bg-[#000]'>
                            Submit
                        </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )}
    </>
  )
}

export default ReportModal