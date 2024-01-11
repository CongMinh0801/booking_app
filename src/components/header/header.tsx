'use client'

import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
      <div className={`w-full fixed h-20 top-0 left-0 flex justify-center items-center box-border transition-all ${pathName == "/" ? (scrolled ? "text-gray-800 border-gray-200" : "text-white border-gray-600") : "text-gray-800 border-gray-200"} ${pathName == "/" ? (scrolled ? "bg-white" : " bg-transparent") : "bg-white"} border-b z-10`}>
        <div className="flex justify-between items-center w-full xl:max-w-screen-xl">
          <div className="text-3xl h-full font-bold pl-2">
            <Link href="/">
              Brand Name
            </Link>
          </div>
          <div className="flex justify-end">
            <ul className="flex justify-between items-center font-semibold">
              <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="px-3 box-border focus:boder-2 flex items-center justify-center cursor-pointer py-2 rounded hover:bg-slate-100">Header Item</button>
              <li className="px-3 box-border focus:boder-2 flex items-center justify-center cursor-pointer py-2 rounded hover:bg-slate-100">Header Item</li>
              <li className="px-3 box-border focus:boder-2 flex items-center justify-center cursor-pointer py-2 rounded hover:bg-slate-100">Header Item</li>
              <li className="px-3 box-border focus:boder-2 flex items-center justify-center cursor-pointer py-2 rounded hover:bg-slate-100">Header Item</li>            </ul>
            <div className="flex items-center my-2">
              <button type="button" className="ml-4 transition-all text-blue-600 hover:text-white border border-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-700">                
                Đăng ký
              </button>
              <button type="button" className="ml-4 transition-all text-white border border-blue-600 hover:border-blue-700 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none dark:focus:ring-blue-700">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header