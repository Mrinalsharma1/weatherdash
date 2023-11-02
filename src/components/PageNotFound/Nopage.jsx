import React from 'react'
import './Nopage.css'

function Nopage() {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='page-not-found'>
                            <div className='error-box'>
                                <h1><span className='text-danger'>404</span> Page Not Found</h1>
                                <p className='text-danger fw-bolder'>Please check Your URL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nopage