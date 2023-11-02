import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

interface ProfileDropDownProps {
    userData: any;
}

const ProfileDropDown : React.FC<ProfileDropDownProps> = ({userData}) => {

    const handleNotVerified = () => {
        return toast.error('Not verified by admin' , {duration : 2000 , style : {color : '#fff' , background : 'black'}});
    }

  return (
    <>
    <div className='flex flex-col dropDownProfile'>
        <ul className='flex flex-col gap-4 font-semibold text-sm cursor-pointer'>
            <Link to='/account'>
                <li className='hover:bg-blue-gray-100 py-2'>Profile</li>
            </Link>
            <hr className='border border-gray-400' />
            {userData?.verify === false ? (
                <li onClick={handleNotVerified} className='hover:bg-blue-gray-100 py-2'>Post Your Job</li>
            ) : userData?.verify === true ? (
                <Link to='/details' className='hover:bg-blue-gray-100 py-2'>
                <li>Post Your Job</li>
                </Link>
            ) : (
                <Link to='/details' className='hover:bg-blue-gray-100 py-2'>
                <li>Add Details</li>
                </Link>
            )}
            <hr className='border border-gray-400' />
            <Link to='/saved'>
                <li className='hover:bg-blue-gray-100 py-2'>Saved Items</li>
            </Link>

            {/* {(!userData.verify ) && (
                <Link to='/details' className='hover:bg-blue-gray-100 py-2'>
                <li>Add Details</li>
                </Link>
            )} */}

        </ul>
    </div>
    </>
  )
}

export default ProfileDropDown