import {ThreeDots} from 'react-loader-spinner'

const DotsLoader = () => {
    return (
        <>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
            />
        </>
    )
}

export default DotsLoader