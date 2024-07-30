import React , {useState , useEffect} from 'react'
import TopBar from '../../Components/admin/TopBar'
import toast from 'react-hot-toast';
import { adminAxiosInstance } from '../../api/axiosInstance';
import IndustryTable from '../../Components/admin/IndustryTable';
import { Helmet } from 'react-helmet-async';

const CategoryAdd = () => {
    const [industry , setIndustry] = useState<string>('');
    const [items , setItems] = useState<any>([]);
    const [updateUI , setUpDateUI] = useState<boolean>(false);

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!industry){
            toast.error('Fill the fields' , {duration : 2000});
        }

        adminAxiosInstance.post('/category', {industry})
        .then((res) => {
            if(res.data.message){
                toast.success(res.data.message);
                setIndustry('');
            }

            if(res.data.error){
                toast.error(res.data.error , {duration : 2000});
            }
        }).catch((error) => console.log('category add error' , error)
        )
    }

    useEffect (() => {
        adminAxiosInstance.get('/getIndustries')
        .then((response) => {
            if(response.data.message){
                setItems(response.data.industries);
            }

            if(response.data.error){
                toast.error(response.data.error , {duration : 2000});
            }
        }).catch((error) => console.log('industry fetch error' , error))
    },[industry , updateUI]);
  return (
    <>
        <Helmet>
            <title>Category Management - CareerUp Admin</title>
        </Helmet>
        <TopBar/>
        <div className="form border-solid flex min-h-full flex-1 flex-col justify-center mb-5 px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Add Job Industry Type
            </h2>
            </div>

            <div className="border-2 rounded-md border-violet-950 p-5 bg-gray-300 mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit} method="POST">

                <div className='mb-4'> 
                <label htmlFor="industry" className="block text-sm font-medium leading-6 text-black border-gray-200">
                    
                </label>
                <div className="mt-2">
                    <input
                    id="industry"
                    value={industry}
                    name="industry"
                    type="text"
                    onChange={(e) => setIndustry(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue hover:bg-light-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
                </div>
            </form>
            </div>
        </div>

        <IndustryTable setUpdateUI={setUpDateUI} items={items} />
    </>
  )
}

export default CategoryAdd