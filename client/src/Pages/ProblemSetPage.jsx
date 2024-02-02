import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import classNames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
export default function ProblemSetPage() {
    const [problems, setProblems] = useState([]);
    const { user, setUser, ready } = useContext(UserContext);
    useEffect(() => {
        if (ready) {
            axios.get('/problems').then(response => {
                setProblems(response.data);
            });
        }
    }, [ready]);
    if (!ready) {
        return 'Loading..';
    }


    return (
        <div className="my-12 pt-20 min-h-screen">
            {!!user && (user.role.toLowerCase() === "problemsetter") && (
                <div className="md:mx-32 mx-12">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full hover:bg-opacity-95" to={'/setproblem/new'}>
                        Set Problems
                    </Link>
                </div>
            )}
            <div className="md:ml-32 ml-12 my-16 w-4/5 md:w-3/5">
                <div className="bg-gray-800 sm:rounded-lg">
                    <div className="flex lg:gap-8 md:gap-4">
                        <h1 className="font-semibold text-lg md:text-xl py-2 md:py-5 md:px-5 px-3 basis-2/5">Problem Name</h1>
                        <h1 className="font-semibold text-lg md:text-xl py-2 md:py-5 basis-2/5">Difficulty</h1>
                    </div>
                    {problems.length > 0 && problems.map((problem, index) => (
                        <Link to={'/problem/' + problem._id} key={index} className={classNames("flex flex-col grid grid-cols-[3fr_3fr_1fr] px-1 md:px-4 py-3 whitespace-nowrap",
                            index % 2 === 1 ? "bg-gray-800" : "bg-black bg-opacity-20")}>
                            <h2 className="md:text-base text-sm text-primary-text px-2 py-1">{problem.name}</h2>
                            <h2 className="md:text-base text-sm text-primary-text px-2 py-1">{problem.difficulty}</h2>
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-5 h-5 text-offwhite">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                                </svg>


                            </div>


                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}