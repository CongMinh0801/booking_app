'use client'

import { useEffect, useState } from "react";
import DropList from "./drop-list/drop-list"
import { usePathname } from 'next/navigation'
import "./navbar.css"

export default function Navbar() {
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
      <div className={`w-full fixed top-20 h-12 box-border left-0 flex justify-center items-center transition-all ${pathName == "/" ? (scrolled ? "text-gray-600" : "text-white") : "text-gray-600"} ${pathName == "/" ? (scrolled ? "bg-white border-gray-200" : " bg-transparent border-gray-600") : "bg-white border-gray-200"} border-b shadow-lg z-10`}>
        <div className="flex fixer top-0 left-0 justify-between items-center w-full xl:max-w-screen-xl">
          <ul className="flex justify-between h-10">
            <li className={`navbar-have-drop-list h-full relative flex items-center text-sm px-2 font-medium  ${pathName == "/" ? (scrolled ? "hover:bg-gray-100" : "hover:bg-gray-400") : "hover:bg-gray-100"} cursor-pointer`} data-dropdown-toggle="dropdown">
                Navbar Item
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

                <DropList scrolled = {scrolled}/>
            </li>
            <li className={`h-full flex items-center text-sm px-2 font-medium  ${pathName == "/" ? (scrolled ? "hover:bg-gray-100" : "hover:bg-gray-400") : "hover:bg-gray-100"} cursor-pointer`}>Navbar Item</li>
            <li className={`h-full flex items-center text-sm px-2 font-medium  ${pathName == "/" ? (scrolled ? "hover:bg-gray-100" : "hover:bg-gray-400") : "hover:bg-gray-100"} cursor-pointer`}>Navbar Item</li>
            <li className={`h-full flex items-center text-sm px-2 font-medium  ${pathName == "/" ? (scrolled ? "hover:bg-gray-100" : "hover:bg-gray-400") : "hover:bg-gray-100"} cursor-pointer`}>Navbar Item</li>
            <li className={`h-full flex items-center text-sm px-2 font-medium  ${pathName == "/" ? (scrolled ? "hover:bg-gray-100" : "hover:bg-gray-400") : "hover:bg-gray-100"} cursor-pointer`}>Navbar Item</li>
          </ul>
        </div>
      </div>
    )
}