import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center  min-h-12 bg-slate-600 text-blue-100">
        <div >
          <span className="font-bold text-xl mx-10">iTask</span>
        </div>
        <ul className="flex gap-8 mr-10 items-center">
            <li className="cursor-pointer hover:font-bold">Home</li>
            <li className="cursor-pointer hover:font-bold">Your Tasks</li>
        </ul>
    </nav>
  )
}
export default Navbar
