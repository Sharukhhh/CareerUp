import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { axiosInstance } from '../../../api/axiosInstance';
import toast from 'react-hot-toast';

interface PermissionBoxProps {
    visible : boolean;
    closeBox : () => void;
    dataId : string;
    type : 'education' | 'profession' | 'job' ;
    setUpdateUI :(data: any) => void;
}

const PermissionBox: React.FC<PermissionBoxProps> = ({ visible , setUpdateUI, closeBox, dataId , type}) => {
    const [open, setOpen] = useState(true);

    const cancelButtonRef = useRef(null);

    let endPoint = '';

    if(type === 'education'){
      endPoint = `/delete_edu/${dataId}`
    } else if(type === 'profession'){
      endPoint = `/delete_pro/${dataId}`
    } else if(type === 'job'){
      endPoint = `/deletejob/${dataId}`
    }

    const deleteData = () => {
      axiosInstance.delete(endPoint)
      .then((res) => {
        if(res.data.message){
          toast.success(res.data.message);
          closeBox();
          setUpdateUI((prev : any) => !prev);
        }

        if(res.data.error){
          toast.error(res.data.error , {duration: 2000});
        }
      }).catch((err) => console.log(err , 'delete pro err')
      )
    }

    const confirmationMessage = {
      education: 'Are you sure you want to delete this education?',
      profession: 'Are you sure you want to delete this profession?',
      job: 'Are you sure you want to delete this job?',
    };

  return (
    <>
    {visible && (
            <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm shadow-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                    </div> */}
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Confirmation
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {confirmationMessage[type]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button" onClick={deleteData}
                    className="inline-flex w-full justify-center rounded-md bg-[#e76e6e] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={closeBox}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    )}
    </>
  )
}

export default PermissionBox