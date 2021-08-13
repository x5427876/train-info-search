const List = (props) => {

    const tripLine = () => {
        switch (props.TripLine) {
            case 0:
                return ''
            case 1:
                return '山線'
            case 2:
                return '海線'
        }
    }

    return (
        <>
            <div className='border-2 border-gray-300 grid grid-cols-6 w-[80vw] rounded-xl mx-auto my-2 py-3 sm:py-8 hover:shadow-inner hover:bg-blue-100'>
                <div className='flex mx-4 sm:mx-24 justify-start items-center col-span-3 lg:col-span-2'>
                    <a className='text-lg sm:text-2xl font-bold whitespace-nowrap'>{props.trainType}&nbsp;&nbsp;</a>
                    <a className='text-xl'>{props.trainNo}</a>
                </div>
                <div className='flex mx-4 sm:mx-24 justify-center items-center col-span-3 lg:col-span-2'>
                    <div className='flex items-center'>
                        <div className='mx-1 flex flex-col'>
                            <a className='mx-2 whitespace-nowrap text-lg sm:text-2xl font-bold'>{props.from}</a>
                            <a className='mx-2 whitespace-nowrap text-md sm:text-lg'>{props.fromTime}</a>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                        <div className='mx-1 flex flex-col'>
                            <a className='mx-2 whitespace-nowrap text-lg sm:text-2xl font-bold'>{props.to}</a>
                            <a className='mx-2 whitespace-nowrap text-md sm:text-lg'>{props.toTime}</a>
                        </div>
                    </div>
                </div>
                <div className='flex sm:mx-24 mt-4 justify-center items-center col-span-6 lg:col-span-2'>
                    <a className={`mr-2 whitespace-nowrap font-bold ${tripLine() !== '' ? tripLine() === '山線' ? 'border-2 border-green-700 text-green-700 px-3 py-1 rounded-full' : 'border-2 border-blue-700 text-blue-700 px-3 py-1 rounded-full' : ''}`}>{tripLine()}</a>
                    <a className={`mr-2 whitespace-nowrap font-bold ${props.WheelChairFlag === 0 ? '' : 'border-2 border-yellow-600 text-yellow-600 px-3 py-1 rounded-full'}`}>{props.WheelChairFlag === 0 ? '' : '身障座位'}</a>
                    <a className={`mr-2 whitespace-nowrap ${props.BreastFeedFlag === 0 ? '' : 'font-bold border-2 border-pink-600 text-pink-600 px-3 py-1 rounded-full'}`}>{props.BreastFeedFlag === 0 ? '' : '哺乳室'}</a>
                </div>
            </div>
        </>
    )
}


export { List }