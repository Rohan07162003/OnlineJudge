import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function SubmissionsPage() {
    const [subs, setSubs] = useState([]);
    const { user, setUser, ready } = useContext(UserContext);
    useEffect(() => {
        if (ready) {
            axios.get('/submissions').then(response => {
                setSubs(response.data);
            });
        }
    }, [ready]);
    if (!ready) {
        return 'Loading..';
    }
    return (
        <div>
            <div>
                <div className="text-center mt-12 p-12 text-lg">Submissions</div>
                <div className="px-10 bg-white my-2 grid grid-cols-5 gap-3 divide-x font-semibold mr-20">
                    <h1 className="text-center">When</h1>
                    <h1 className="text-center">Who</h1>
                    <h1 className="text-center">Problem</h1>
                    <h1 className="text-center">Language</h1>
                    <h1 className="text-center">Status</h1>
                </div>
                {subs.length > 0 && subs.map(submissions => (
                    <div className="mr-20">
                        <div className="px-10 bg-white my-2 grid grid-cols-5 gap-3 divide-x text-center">
                            <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.submittedAt}</h2>
                            <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.owner}</h2>
                            <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.name}</h2>
                            <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.language}</h2>
                            {submissions.result === "Accepted!" && (
                                <h2 className="text-lg text-green-400 px-2 py-1">{submissions.result}</h2>
                            )}
                            {submissions.result === "Wrong answer on test case 2" && (
                                <h2 className="text-lg text-red-400 px-2 py-1">{submissions.result}</h2>
                            )}

                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

