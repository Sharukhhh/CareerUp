import React  , {useState , useEffect} from 'react';
import { Link , useParams ,useNavigate } from 'react-router-dom';
import {IoArrowBackCircle} from 'react-icons/io5';
import { useSelector } from 'react-redux';
import RootState from '../../Redux/rootstate/rootState';
import { axiosInstance } from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import {BsFillSave2Fill} from 'react-icons/bs';
import {BiSolidError} from 'react-icons/bi';
import { Helmet } from 'react-helmet-async';

const AddInfoPage = () => {

  const user = useSelector((state : RootState) => state.user.userCred);
  
  const isCompany = user?.role === 'Company';

  const navigate = useNavigate();

  const {id} = useParams();
  const isEdit = !!id;

  const [industries , setIndustries] = useState<any[]>([]);

    //education
    const [institute , setInstitute] = useState<string>('');
    const [field , setField] = useState<string>('');
    const [instituteLocation , setInstituteLocation] = useState<string>('');

    //profession/experience
    const [companyName , setCompanyName] = useState<string>('');
    const [role , setRole] = useState<string>('');
    const [companyLocation , setCompanyLocation] = useState<string>('');

    //post-job
    const [position , setPosition] = useState<string>('');
    const [location, setJobLocation] = useState<string>('');
    const [salaryPackage , setSalaryPackage] = useState<string>('');
    const [requirements , setRequirements] = useState<string>('');
    const [industry , setIndustry] = useState<string >('');


  useEffect(() => {
    if(isEdit){
      axiosInstance.get(`/editdata/${id}`)
      .then((res) => {
        if(res.data.message){

          setInstitute(res.data?.info?.institute);
          setField(res.data?.info?.fieldOfStudy);
          setInstituteLocation(res.data?.info?.instituteLocation);

          setCompanyName(res.data?.info?.companyName);
          setCompanyLocation(res.data?.info?.jobLocation);
          setRole(res?.data?.info?.role);

          setPosition(res.data?.info?.position);
          setJobLocation(res?.data?.info?.location);
          setSalaryPackage(res?.data?.info?.salaryPackage);
          setRequirements(res?.data?.info?.requirements);
          setIndustry(res?.data?.info?.industry?.industry);
        }
      }).catch((error) => console.log(error , 'axios bringerror')
      )
    }
  }, [isEdit , id]);

  useEffect(() => {
    if(isCompany){
      axiosInstance.get('/getIndustries')
      .then((res) => {
        if(res.data.message){
          setIndustries(res.data.industries);
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((error) => console.log(error , 'axios indutry fetch error')
      )
    }
  },[isCompany]);

  
  


  const handleEducationFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!institute || !field || !instituteLocation ){
      return toast.error('Fill all the fields!' , {duration : 2000 , icon : <BiSolidError/> });
    }

    if(isEdit){
      axiosInstance.put(`/editedu/${id}` , {institute , fieldOfStudy : field , instituteLocation})
      .then((res) => {
        if(res.data.message){
          navigate('/account');
          toast.success(res.data.message);
        }
      }).catch((error) => {
        console.log(error);
      })

    } else {

      axiosInstance.post(`/add_edu/${user?.userId}`, {institute , fieldOfStudy : field ,  instituteLocation })
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message , {icon : <BsFillSave2Fill/> });

          setInstitute('');
          setField('');
          setInstituteLocation('');
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((err) => console.log('axios error' , err)
      )
    }
  }


  const handleProfessionFormSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!companyName || !role || !companyLocation){
      return toast.error('Fill all the fields!' , {duration : 2000 , icon : <BiSolidError/> , });
    }

    if(isEdit){
      axiosInstance.put(`/editpro/${id}` , {companyName , role , jobLocation : companyLocation})
      .then((res) => {
        if(res.data.message){
          navigate('/account');
          toast.success(res.data.message);
        }
      }).catch((error) => {
        console.log(error);
      })

    } else {

      axiosInstance.post(`/add_pro/${user?.userId}` , {companyName , role , jobLocation : companyLocation})
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
  } 




  const handleJobPost = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!position || !location || !requirements || !industry){
      return toast.error('Fill all the fields!' , {duration : 2000 , icon : <BiSolidError/> });
    }

    if(isEdit){
      axiosInstance.put(`/editjob/${id}` , {position , location , salaryPackage , industry : industry , requirements})
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message , {icon : <BsFillSave2Fill/> });

          setPosition('');
          setJobLocation('');
          setSalaryPackage('');
          setRequirements('');
          setIndustry('');
        }

        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((error) => console.log(error , 'axios job edit err')
      )
    } else {
      axiosInstance.post(`/postjob` , {position, location , salaryPackage , industry : industry, requirements})
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message , {icon : <BsFillSave2Fill/> });
  
          setPosition('');
          setJobLocation('');
          setRequirements('');
          setIndustry('');
        }
  
        if(res.data.error){
          toast.error(res.data.error);
        }
      }).catch((error) => console.log(error , 'axios job post err')
      )
    }
  }


  return (
    <>
      <Helmet>
        <title>{`${user?.username} - Details`}</title>
      </Helmet>
        <div className='max-w-3xl mx-auto mt-8 p-6 bg-[#c3e3f7]  border: rounded-lg shadow-xl'>
            <div className='flex justify-between'>
              {user?.role === 'Candidate' ? (
                <h1 className='text-3xl font-bold mb-3'>Fill Your Details</h1>
              ) : (
                <h1 className='text-3xl font-bold mb-3'>Post a Job</h1>
              )}
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
                <div className='grid md:grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="institute">Institute</label>

                  <input onChange={(e) => setInstitute(e.target.value)} value={institute}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[666#] shadow-md'
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
            
                </div>

                <button type='submit' className='mt-2 px-4 py-2 bg-blue text-white rounded hover:bg-[#2a398fd2]'>
                  {isEdit ? 'Update' : 'Save'}
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

                <button type='submit' className='mt-2 px-4 py-2 bg-blue text-white rounded hover:bg-[#2a398fd2]'>
                  {isEdit ? 'Update' : 'Save'}
                </button>
              </form>  
              </>
            ) : (
              <>
              <h2 className='text-lg font-bold mb-2'>Post Your Job</h2>
              <form onSubmit={handleJobPost} >
                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="hiring position">Position For Hiring</label>
                  <input onChange={(e) => setPosition(e.target.value)} value={position}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='position' placeholder='Add Position For Hiring' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="package">Package</label>
                  <input onChange={(e) => setSalaryPackage(e.target.value)} value={salaryPackage}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='package' placeholder='Salary Package' />
                </div>

                <div className='grid md: grid-cols-2 gap-3 mb-3'>
                  <label className='text-ascent-2 text-sm mb-2' htmlFor="location">Location</label>
                  <input onChange={(e) => setJobLocation(e.target.value)} value={location}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text=[#666] shadow-md'
                  type="text" name='location' placeholder='location' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="Requirements">Requirements</label>
                  <input onChange={(e) => setRequirements(e.target.value)} value={requirements}
                  className='bg-secondary rounded border border-[#66666690] 
                  outline-none text-sm text-ascent-1 p-8 placeholder:text=[#666] shadow-md'
                  type="text" name='requirements' placeholder='' />

                  <label className='text-ascent-2 text-sm mb-2' htmlFor="Industry">Select Industry</label>
                    <select 
                      className='bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] shadow-md'
                      id="industry" name='industry' value={industry} onChange={(e) => setIndustry(e.target.value)}>
                      <option value=''>Select an Industry</option>
                      {industries.map((indstry : any) => {
                        return(
                        <option key={indstry._id} value={indstry._id}>{indstry}</option>
                        )
                      })}
                    </select>
                </div>

                <button type='submit' className='mt-2 px-4 py-2 bg-blue text-white rounded hover:bg-[#2a398fd2]'>
                  {isEdit ? 'Update' : 'Save'}
                </button>
              </form>  
              </>
            )}
        </div>
    </>
  )
}

export default AddInfoPage


