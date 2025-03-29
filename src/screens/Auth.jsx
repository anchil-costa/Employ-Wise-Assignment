import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';

const Auth = () => {
  const[email,setEmail]= useState('');
  const[password,setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate= useNavigate();


  const login = async () =>{
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });

      const user_token = response.data.token;
      console.log('User Token:', user_token);

      localStorage.setItem('token', user_token); // Store token

      toast.success('Login Successful!');
      navigate('/userslist'); // Navigate only if token exists
    } catch (error) {
      toast.error('Error in login', error.response?.data?.error || 'Something went wrong');
      toast.error(error.response?.data?.error || 'Login failed');
      setEmail('');
      setPassword('');
    }
  }



  return (
    <div className=' min-h-screen bg-gray-400 w-full h-full border flex-1 items-center justify-center'>
      <div className='flex-1 h-[690px] bg-white m-[20px] rounded-2xl justify-center items-center'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                type='email'
                  required
                  autoComplete="email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={login}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
              >
                Sign in
              </button>
            </div>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Auth