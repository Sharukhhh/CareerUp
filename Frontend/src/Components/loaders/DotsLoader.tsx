import {ThreeDots} from 'react-loader-spinner'

const DotsLoader = () => {
    return (
        <>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="blue"
                radius="9"
                ariaLabel="three-dots-loading"
            />
        </>
    )
}

export default DotsLoader