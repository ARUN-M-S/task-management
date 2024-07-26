import React from 'react'

const SignInPage = () => {
  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center bold">Sign in</h1>
            <input 
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="userName"
                placeholder="User Name" />

            

            <input 
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password" />
           

            <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
            >Sign in</button>

<div className="text-grey-dark mt-6 w-full text-right">
          Don't have an account ?
          <a className="no-underline  text-blue-500 ml-2" href="/sign-up">
            Sign up
          </a>.
        </div>
        </div>

       
    </div>

  )
}

export default SignInPage
