import React , {useState , useEffect} from 'react'

interface PaginationProps{
    datas : any[];
    currentPage : number;
    itemsPerPage : number;
    handlePageChange : (currentPage : number) => void;
    onDisplayedDataChange : (displayedData : any[]) => void;
}

const Pagination : React.FC<PaginationProps> = ({datas , currentPage , itemsPerPage, handlePageChange , onDisplayedDataChange}) => {

    const [pageCount , setPageCount] = useState<number>(0);
    const [displayedDatas , setDisplayedDatas] = useState<any[]>([]);

    console.log(displayedDatas);
    

    useEffect(() => {
        setPageCount(Math.ceil(datas?.length / itemsPerPage));

        const newDisplayedData = datas?.slice(currentPage * itemsPerPage , (currentPage + 1) * itemsPerPage)
        
        setDisplayedDatas(newDisplayedData);
        onDisplayedDataChange(newDisplayedData);
    }, [datas , itemsPerPage , currentPage , onDisplayedDataChange]);

  return (
    <div className='flex justify-center my-10'>
    <nav className='block'>
        <ul className="flex pl-0 rounded list-none flex-wrap">
            <li>
                <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className="relative block py-2 px-3 leading-tight bg-white border
                border-gray-300 text-blue-700 hover:bg-gray-200 hover:text-blue-900 rounded-l-lg"
                >
                    Previous
                </button>
            </li>

            {Array.from({length : pageCount} , (_ , i) => (
                <li key={i}>
                    <button 
                    onClick={() => handlePageChange(i)}
                    className={`relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 hover:bg-gray-200 hover:text-blue-900 ${
                        currentPage === i ? 'bg-gray-200' : ''}`}>
                        {i + 1}
                    </button>
                </li>
            ))}

            <li>
                <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
                className="relative block py-2 px-3 leading-tight bg-white border 
                border-gray-300 text-blue-700 hover:bg-gray-200 hover:text-blue-900 rounded-r-lg"
                >
                    Next
                </button>
            </li>
        </ul>
    </nav>
</div>
  )
}

export default Pagination