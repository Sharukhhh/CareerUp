import React  , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import {IoArrowBackCircle} from 'react-icons/io5';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import {BsFillSave2Fill} from 'react-icons/bs';
import {BiSolidError} from 'react-icons/bi';

const AddInfoPage = () => {
  const currentDate = new Date();

  const user = useSelector((state : RootState) => state.user.userCred);
  
  //education
  const [institute , setInstitute] = useState<string>('');
  const [field , setField] = useState<string>('');
  const [instituteLocation , setInstituteLocation] = useState<string>('');
  const [eFromDate , setFromDate] = useState<Date>(currentDate);
  const [eEndDate , setEEndDate] = useState<Date>(currentDate);

  const handleEducationFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!institute || !field || !instituteLocation || !eFromDate || !eEndDate){
      return toast.error('Fill all the fields!' , {duration : 2000 , icon : <BiSolidError/> });
    }

    axiosInstance.post(`/add_edu/${user?.userId}`, {institute , fieldOfStudy : field , location : instituteLocation , 
      from : eFromDate , to : eEndDate})
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message , {icon : <BsFillSave2Fill/> });

          setInstitute('');
          setField('');
          setInstituteLocation('');
          setFromDate(currentDate);
          setEEndDate(currentDate);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log('axios error' , err)
      )
  }


  //profession
  const [companyName , setCompanyName] = useState<string>('');
  const [role , setRole] = useState<string>('');
  const [companyLocation , setCompanyLocation] = useState<string>('');

  const handleProfessionFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!companyName || !role || !companyLocation){
      return toast.error('Fill all the fields!' , {duration : 2000 , icon : <BiSolidError/> , });
    }

    axiosInstance.post(`/add_pro/${user?.userId}` , {companyName , role , location : companyLocation})
    .then((res) =>{

      if(res.data.message){
        toast.success(res.data.message, {icon : <BsFillSave2Fill/> });

        setCompanyName('');
        setRole('');
        setCompanyLocation('');
      }

      if(res.data.error){
        toast.error(res.data.error);
      }

    }).catch((err) => console.log('axios errpr' , err)
    )
  } 


  return (
    <>
    <Toaster position='top-center' />
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-light-blue-50  border: rounded-lg shadow-xl'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold mb-3'>Fill Your Details</h1>
                <div className='flex'>
                  <Link to='/account'>
                  Back <IoArrowBackCircle size={20} />
                  </Link>
                </div>
            </div>

            <hr className='my-6 border-t border-gray-700' />

            {user?.role === 'Candidate' ? (
              <>
              <h2 className='text-lg font-bold mb-2'>Add Education</h2>
              <form onSubmit={handleEducationFormSubmit} >
                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="institute">Institute</label>

                  <input onChange={(e) => setInstitute(e.target.value)} value={institute}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='institute' placeholder='Institute that you studied' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="fieldOfStudy">Field of Study</label>

                  <input onChange={(e) => setField(e.target.value)} value={field}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='fieldOfStudy' placeholder='field of study' />
                </div>

                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="location">Location</label>

                  <input onChange={(e) => setInstituteLocation(e.target.value)} value={instituteLocation}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='location' placeholder='location' />
            
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="from Date">From</label>

                  <input onChange={(e) => setFromDate(new Date(e.target.value))}
                  value={eFromDate ? eFromDate.toISOString().split('T')[0] : ''}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="date" name="date" placeholder='from' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="upto date">Upto</label>

                  <input onChange={(e) => setEEndDate(new Date(e.target.value))}
                  value={eEndDate ? eEndDate.toISOString().split('T')[0] : ''}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="date" name="upto" placeholder='upto'/>
                </div>

                <button type='submit' className='mt-2 px-4 py-2 bg-light-blue-900 text-white rounded hover:bg-light-blue-600'>
                  Save 
                </button>
              </form>  



              <hr className='my-6 border-t border-gray-700' />



              <h2 className='text-lg font-bold mb-2'>Add Profession / Experience</h2>
              <form onSubmit={handleProfessionFormSubmit} >
                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="company">Name of the company</label>

                  <input onChange={(e) => setCompanyName(e.target.value)} value={companyName} 
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='companyName' placeholder='Company Name' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="company">Position</label>

                  <input onChange={(e) => setRole(e.target.value)} value={role} 
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='position' placeholder='Your Position' />
                </div>

                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="location">Location</label>

                  <input onChange={(e) => setCompanyLocation(e.target.value)} value={companyLocation}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='location' placeholder='location' />
                </div>

                <button type='submit' className='mt-2 px-4 py-2 bg-light-blue-900 text-white rounded hover:bg-light-blue-600'>
                  Save 
                </button>
              </form>  
              </>
            ) : (
              <>
              <h2 className='text-lg font-bold mb-2'>Post Your Job</h2>
              <form>
                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="hiring position">Position For Hiring</label>
                  <input 
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='position' placeholder='Add Position For Hiring' />
                </div>

                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="location">Location</label>
                  <input 
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='location' placeholder='location' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="Requirements">Requirements</label>
                  <input 
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 p-8 placeholder:text=[#666] shadow-md'
                  type="text" name='requirements' placeholder='' />
                </div>

                <button type='submit' className='mt-2 px-4 py-2 bg-light-blue-900 text-white rounded hover:bg-light-blue-600'>
                  Save 
                </button>
              </form>  
              </>
            )}
        </div>
    </>
  )
}

export default AddInfoPage


