import React from 'react'

const Loader = ({ title }) => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen gap-2'>

            {/* SPIINING ANIMATION  */}
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>

            {/* LOADING TITLE  */}
            <div>
                <span>{title}</span>
            </div>
        </div>
    )
}

export default Loader