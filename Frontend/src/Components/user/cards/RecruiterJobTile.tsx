import  {useState , useEffect} from 'react'
import { axiosInstance } from '../../../api/axiosInstance'
import { useNavigate } from 'react-router-dom';

const RecruiterJobTile = () => {

  const navigate = useNavigate();

  const [jobs , setJobs] = useState<any>([]);

  const [isAccordionOpen , setIsAccordionOpen] = useState<boolean[]>(
    Array(jobs.length).fill(false)
  );

  const toggleAccordion = (index : number) => {
    const updateAccordionState = [...isAccordionOpen];
    updateAccordionState[index] = !updateAccordionState[index];
    setIsAccordionOpen(updateAccordionState);
  }

  useEffect(() => {
    axiosInstance.get('/postedjobs')
    .then((res) => {
      if(res.data.message){
        setJobs(res.data.jobs);
      }
    }).catch((error) => console.log(error)
    )
  },[]);

  const openApplicants = (jobId : string) => {
    navigate(`/applicants/${jobId}`);
  }
  
  return (
    <>
      {jobs?.length > 0 ? (
        jobs?.map((job : any , index : number) => {
        return(
          <div className='border rounded-lg my-2 mx-4 shadow-md' key={job?._id}>
              <div onClick={() => toggleAccordion(index)} className='border-b-2 bg-gradient-to-tl from-[#9facfc] to-[#e9eaec] px-4 py-5 cursor-pointer'>
                  <h3 className='text-xl text-gray-800 font-bold'>{job?.position}</h3>
              </div>

              <div className={isAccordionOpen[index] ? 'p-4 bg-blue-gray-50 border-blue-gray-500' : 'p-4 hidden bg-blue-gray-50 border-blue-gray-500'}>
                  <p className='text-md font-semibold'>{job?.location}</p>
                  <p className='text-md font-semibold'>Salary : {job?.salaryPackage}</p>
                  <p className='text-md mt-3 text-ascent-1'>
                    {job?.requirements}
                  </p>
                  
                  <div className='flex mt-2'>
                    <button onClick={() => openApplicants(job?._id)} className='px-5 py-2 bg-blue cursor-pointer font-bold text-white rounded hover:bg-[#2a398fd2] mt-2 lg:mt-0'>
                      View Applicants
                    </button>
                  </div>
              </div>
          </div>
        )
        })
      ) : (
        <p className='bg-gray-200 px-4 py-2 font-semibold'>
          You haven't posted any jobs!
        </p>
      )}  
    </>
  )
}

export default RecruiterJobTile