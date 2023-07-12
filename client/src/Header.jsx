import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
export default function Header() {
    const [IsOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!IsOpen);
    };
    let menuRef = useRef();
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setIsOpen(false);
                console.log(menuRef.current);
            }
        }
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    });
    return (
        <div>
            <header className='p-4 flex justify-between w-full items-center shadow-lg'>
                <a href="" className='flex items-center gap-1 '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-8 md:h-8 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <span className='font-bold text-lg md:text-xl'>CodeWave</span>
                </a>
                <div className=' hidden md:flex justify-end items-center'>
                    <Link to={"/"} className='mr-10 text-base hover:bg-indigo-100 py-2 px-4'>Home</Link>
                    <div className='mr-10 text-base hover:bg-indigo-100 py-2 px-4'>Compile</div>
                    <div className='mr-12 text-base hover:bg-indigo-100 py-2 px-4'>Problemset</div>
                    <button className='mr-20 text-lg border border-gray-400 px-4 py-1 text-cyan-700 hover:text-white hover:bg-blue-500'>
                        <Link to={"/login"}>Login</Link>
                    </button>
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleNavbar}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        {IsOpen && (
                            <div className="flex flex-col justify-between absolute top-16 right-0 z-10 bg-white divide-y divide-gray-100 rounded-xl drop-shadow-md shadow w-40 dark:bg-gray-700 dark:divide-gray-600" ref={menuRef}>
                                <Link to={"/"} className="flex block text-gray-900 px-4 py-2 hover:bg-indigo-100 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                                <div className="flex block px-4 py-2 hover:bg-indigo-100 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Compile</div>
                                <div className="flex block px-4 py-2 hover:bg-indigo-100 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Problemset</div>
                            </div>
                        )}
                    </button>
                </div>
            </header>

        </div>
    );
}