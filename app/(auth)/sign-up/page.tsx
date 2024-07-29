"use client"
import { AuthServices } from 'app/utils/services/api/apiService';
import { signUpRequest } from 'app/utils/services/Dto/requestsTypes';
import { validateEmail, validatePassword } from 'app/utils/taskUtils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpPage = () => {

    const [gmail, setGmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const router = useRouter();
  
    const handleSubmit = async(e: React.FormEvent) => {
      
        
      e.preventDefault();
      if (!name) {
        alert('Please Provide a Name.');
        return;
      }
      if (!validateEmail(gmail)) {
        alert('Please enter a valid email address.');
        return;
      }
    
      if (!validatePassword(password)) {
        alert('Password must be at least 6 characters long.');
        return;
      }
    
      let data:signUpRequest ={
          email:gmail,
          password:password,
          name:name
          
  
      }
     let signUpData= await  AuthServices.signUp(data);
     if(signUpData?.status ==400 ){
        alert('User alredy exist');
     }else if(signUpData){
        router.push('/sign-in');

     }else {
            alert('Invalid credentials');
          }
     
    };
  
    return (
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="fullname"
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="email"
                    placeholder="Email Address"
                    value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                    
                    />

                <input
                    type="password"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />


                <button
                
                    type="submit"
                    className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
                >Create Account</button>
                </form>

                <div className="text-grey-dark mt-6 text-right">
                    Already have an account ?
                    <a className="no-underline text-blue-500" href="sign-in">
                        Sign in
                    </a>.
                </div>
            </div>


        </div>
    )
}

export default SignUpPage
