import { useContext, useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
export default function Header() {
    const { user,setUser } = useContext(UserContext);
    const [IsOpen, setIsOpen] = useState(false);
    const [fullIsOpen, setFullIsOpen] = useState(false);
    const [redirect, setRedirect] = useState(null);
    
    const toggleNavbar = () => {
        setIsOpen(!IsOpen);
    };
    const toggleProfNavbar = () => {
        setFullIsOpen(!fullIsOpen);
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
            <header className='px-4 pt-4 pb-2 flex justify-between w-full items-center shadow-lg z-10 font-poppins text-offwhite'>
                <Link to={"/"} className='flex items-center gap-1 '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
                        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>

                    <span className='font-bold text-lg md:text-xl'>CodeWave</span>
                </Link>
                <div className=' hidden md:flex justify-end items-center'>
                    <Link to={"/"} className='mr-10 text-base py-2 px-4 font-poppins'>Home</Link>
                    <Link to={"/compile"} className='mr-10 text-base py-2 px-4'>Compile</Link>
                    <Link to={"/problemset"} className='mr-12 text-base py-2 px-4'>Problemset</Link>
                    {!user && (
                        <button className='mr-20 text-lg border border-gray-400 px-4 py-1 text-cyan-700 hover:text-white hover:bg-blue-500'>
                            <Link to={"/login"}>Login</Link>
                        </button>
                    )}
                    {!!user && (
                        <button onClick={toggleProfNavbar} className='mr-20 text-lg px-4 py-1'>
                            <div className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {!fullIsOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hover:bg-gray-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                )}
                                {fullIsOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                )}



                            </div>

                            {fullIsOpen && (
                                <div className="flex flex-col justify-between text-primary-text bg-background1 absolute top-16 right-28 z-10 rounded-l drop-shadow-md shadow w-56 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="flex block text-sm px-5 py-2">{user.username}</div>
                                    <Link to={"/account"} className="flex block text-sm px-5 py-2 hover:bg-indigo-100 hover:rounded-sm dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                    <Link to={"/account"} className="flex block text-sm px-5 py-2 hover:bg-indigo-100 hover:rounded-sm dark:hover:bg-gray-600 dark:hover:text-white">Logout</Link>
                                </div>
                            )}
                        </button>
                    )}
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleNavbar} ref={menuRef}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        {IsOpen && (
                            <div className="flex flex-col justify-between text-primary-text text-sm absolute top-16 right-0 z-10 bg-background1 bg-page-gradient divide-y divide-gray-100 rounded-xl drop-shadow-md shadow w-40 dark:bg-gray-700 dark:divide-gray-600" >
                                {user && (
                                    <div className="flex items-center hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">
                                        <div className="pl-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        </div>
                                        <Link to={"/account"} className="flex block px-2 py-2 ">{user.username}</Link>
                                    </div>

                                )}
                                {!user && (
                                    <Link to={"/login"} className="flex block px-4 py-2 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
                                )}
                                <Link to={"/"} className="flex block px-4 py-2 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Home</Link>
                                <Link to={"/compile"} className="flex block px-4 py-2 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Compile</Link>
                                <Link to={"/problemset"} className="flex block px-4 py-2 hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Problemset</Link>
                            </div>
                        )}
                    </button>
                </div>
            </header>

        </div>
    );
}