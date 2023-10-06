import React , {useState} from 'react';
import {BiDownArrowCircle} from 'react-icons/bi';

interface JobCardProps {
  jobs : any;
  selectedIndustry : string
}

const JobCard : React.FC<JobCardProps> = ({jobs , selectedIndustry}) => {

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
  return (
    <>
        {filteredJobs?.length > 0 ? (
          filteredJobs?.map((job : any , index : number) => {
            return(
          <div className='border rounded-lg my-2 mx-4 overflow-hidden shadow-md' key={job._id}>
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
                <p className="text-sm">{job?.location}</p>
                <p className="text-sm">{job?.salaryPackage}</p>

                <div className="flex mt-2">
                  <button className="px-4 py-2 bg-blue text-white rounded hover:bg-[#2a398fd2]">Apply</button>
                </div>
            </div>
          </div>
            )
          })
          ) : (
            <p>No Jobs Available</p>
        )}  
        
    </>
  )
}

export default JobCard