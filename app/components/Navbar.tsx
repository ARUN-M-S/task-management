import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center justify-start">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">My Task Manager</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
          <button
            type="button"
            className="flex items-center space-x-2 bg-black text-white px-3 py-2 rounded-md hover:bg-grey"
          >
            {/* <LogoutIcon className="h-5 w-5" /> */}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar

