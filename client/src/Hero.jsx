import { useScroll, useTransform, motion } from "framer-motion";
import GithubIcon from "./assets/github-mark-white.png"
import { useContext, useEffect, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Header from "./Header.jsx";
export const Hero = () => {
    const targetRef = useRef();
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const position = useTransform(scrollYProgress, (pos) =>
        pos >= 1 ? "relative" : "fixed"
    );
    const { user, setUser } = useContext(UserContext);
    const [IsOpen, setIsOpen] = useState(false);
    const [fullIsOpen, setFullIsOpen] = useState(false);
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
        <motion.section style={{ opacity: opacity }} ref={targetRef} className="relative mb-[8rem] h-[100vh] py-16 text-white before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_100px)_var(--y,_100px),_var(--color-secondary)_0%,_var(--color-primary)_100%)] before:opacity-100">
            <div className="absolute bottom-[99vh] w-full text-white text-2xl flex items-center justify-between h-[10vh] px-10 py-10 mt-12">
                <div className="flex items-center gap-2">
                    <div>
                    </div>
                    <div className="font-poppins font-semibold"></div>
                </div>
                <div className='hidden md:flex justify-end items-center'>
                    <Link to={"/"} className='mr-10 text-base px-4 font-poppins'>Home</Link>
                    <Link to={"/compile"} className='mr-10 text-base font-poppins py-2 px-4'>Compile</Link>
                    <Link to={"/problemset"} className='mr-12 text-base font-poppins py-2 px-4'>Problemset</Link>
                    {!user && (
                        <Link className='mr-12 text-base font-poppins py-2 px-4' to={"/login"}>Login</Link>
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
                                <div className="flex flex-col justify-between absolute top-16 right-0 z-10 rounded-l drop-shadow-md shadow w-56 dark:bg-gray-700 dark:divide-gray-600">
                                    <div className="flex block text-sm pl-8 py-2">{user.username}</div>
                                    <Link to={"/account"} className="flex block text-sm pl-8 py-2 font-poppins hover:rounded-sm dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                        
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
                            <div className="flex flex-col justify-between text-sm absolute top-12 right-0 z-10 rounded-xl drop-shadow-md shadow w-40 dark:bg-gray-700 dark:divide-gray-600" >
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
                                    <Link to={"/login"} className="flex block px-4 py-2 font-poppins hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Login</Link>
                                )}
                                <Link to={"/compile"} className="flex block px-4 py-2 font-poppins hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Compile</Link>
                                <Link to={"/problemset"} className="flex block px-4 py-2 font-poppins hover:rounded-md dark:hover:bg-gray-600 dark:hover:text-white">Problemset</Link>
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <motion.div style={{ scale: scale, position }}

                className="fixed z-10 flex flex-col items-center justify-center w-full"
            >
                <p className="mb-2 text-lg md:text-xl font-light">
                    <span className="font-medium">CodeWave</span> Beta
                </p>
                <p className="mb-8 text-center text-xs font-light text-text">
                    by{" "}
                    <a
                        href="https://www.codesandbox.com"
                        target="_blank"
                        rel="noopener nofollow noreferrer"
                    >
                        CodeSandbox
                    </a>

                </p>

                <h1 className="mb-12 text-center font-heading font-semibold font-poppins text-4xl md:text-5xl leading-[1]">
                    Development
                    <br />
                    reimagined.
                </h1>

                <a href="https://github.com/Rohan07162003/OnlineJudge" className="flex items-center text-md md:text-lg">
                    <img src={GithubIcon} className="mr-2 inline h-5 w-5 text-white" />
                    Import GitHub project
                </a>
            </motion.div>
        </motion.section>
    );
};