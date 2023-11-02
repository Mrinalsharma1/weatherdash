import React, { useState } from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { updateAuthState } from '../../reducer/auth'
import { FaFacebookSquare, FaGoodreads } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const signupimg = require('../Assets/img4.jpg')

function Login() {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user/login`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email, password: formData.password })
        });

        const notify = (succ, msg) => {
            // Calling toast method by passing string
            if (succ === true) {
                toast.success(msg)
                setTimeout(() => {
                    navigate("/weatherapp")
                }, 3000);
            } else {
                toast.error(msg)
            }
        }

        const res = await response.json();
        if (res?.success === true) {
            dispatch(updateAuthState(res.result));
            notify(res.success, res.msg)
        } else {
            notify(res.success, res.msg)
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='signup'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center mt-4 '>
                        <div className='col-md-5 bg-white shadow rounded'>
                            <div className='signupImg'>
                                <img src={signupimg} alt="signup" />
                            </div>
                            <div className='signupBox p-3'>
                                <div className='signupTitle'>
                                    <div className='row'>
                                        <div className='col-md-6'> <h3 className='pb-3'>Login</h3></div>
                                        <div className='col-md-6'>
                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end social">
                                                <p><FaFacebookSquare className='fs-3' /></p>
                                                <p><FaGoodreads className='fs-3' /></p>
                                            </div>
                                        </div>
                                        <div className='signupForm'>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Email address</label>
                                                    <input type="email" className="form-control p-1" name='email' onChange={handleInputChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="text" className="form-control p-1" name='password' onChange={handleInputChange} />
                                                </div>
                                                <div className='mb-2 d-grid gap-2 pt-2'>
                                                    <button disabled={formData.username <= 3 || formData.email <= 3 || formData.password <= 3} className='btn btn-primary lg p-1'>Login</button>
                                                </div>
                                                <div className='mb-2'>
                                                    <p className='text-center'>Not a member? <Link to='/signup' className='text-success signupbtn'>Sign Up</Link> </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login