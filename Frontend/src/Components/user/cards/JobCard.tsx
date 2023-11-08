import React , {useState } from 'react';
import {BiDownArrowCircle} from 'react-icons/bi';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import RootState from '../../../Redux/rootstate/rootState';

interface JobCardProps {
  jobs : any;
  selectedIndustry : string;
  setUpdateUI :(data: any) => void;
}

const JobCard : React.FC<JobCardProps> = ({jobs , selectedIndustry , setUpdateUI}) => {

  const user = useSelector((state : RootState) => state.user.userCred);

    const filteredJobs = jobs.filter((job : any) => {
      return selectedIndustry === '' || job?.industry?.industry === selectedIndustry
    });

    const [isAccordionOpen , setIsAccordionOpen] = useState<boolean[]>(
      Array(jobs.length).fill(false)
    );

    const toggleAccordion = (index : number) => {
      const updateAccordionState = [...isAccordionOpen];
      updateAccordionState[index] = !updateAccordionState[index];
      setIsAccordionOpen(updateAccordionState);
    }

    const applyJob = (jobId : string) => {
      axiosInstance.get(`/apply/${jobId}`)
        .then((res) => {
          if(res.data.message){
            toast.success(res.data.message , {duration : 3000});
          // Force a re-render by updating the isAccordionOpen state
          setUpdateUI((prev : any) => !prev);
          }

          if(res.data.error){
            toast.error(res.data.error , {duration: 2000});
          }
        }).catch((error) => console.log(error , 'axios apply error')
      )
    }

  return (
    <>
        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((job : any , index : number) => {
            const hasApplied = job?.applicants?.some((applicant : any) => applicant?.userId?.toString() === user?.userId?.toString());
          return(
          <div className='border rounded-lg my-2 mx-4 shadow-md' key={job?._id}>
            <div className="border-b-2 px-4 py-5 cursor-pointer bg-gradient-to-tl from-[#9facfc] to-[#e9eaec]" title='Click Here'
            onClick={() => toggleAccordion(index)}>
              <div className='flex justify-between items-center'>
                <h3 className="text-xl text-gray-800 font-bold">{job?.position}</h3>
                <div className='text-md flex items-center space-x-1'>
                  <p className='font-thin'>View More</p>
                  <BiDownArrowCircle className="w-4 h-4"/> 
                </div>
              </div>
            </div>

             {/* Accordion Content */}
            <div className={isAccordionOpen[index] ? 'p-4 bg-blue-gray-50 border-blue-gray-500' : 'p-4 hidden bg-blue-gray-50 border-blue-gray-500'}>
              <div className='flex justify-between items-center'>
                <div>
                  <p className='text-xl font-semibold'>{job?.postedBy?.name}</p>
                  <div className='flex flex-col'>
                    <p className="text-md font-semibold">Location : {job?.location}</p>
                    <p className="text-md font-semibold">Salary: {job?.salaryPackage}</p>
                    <p className='text-md mt-3 text-ascent-1'>
                      {job?.requirements}
                    </p>
                  </div>
                </div>
                {hasApplied ? (
                  <button type='button' className='px-5 py-2 bg-gray-400 text-black opacity-50 font-bold cursor-not-allowed'>
                    Applied
                  </button>
                ) : (
                  <button type='button' onClick={() => applyJob(job?._id)} 
                  className="px-5 py-2 bg-blue cursor-pointer font-bold text-white rounded hover:bg-[#2a398fd2] mt-2 lg:mt-0">
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
          )
          })
          ) : (
            <p className='text-center mx-8 bg-blue-gray-100 rounded-sm'>
              No Jobs Available
            </p>
        )}  
        
    </>
  )
}

export default JobCard