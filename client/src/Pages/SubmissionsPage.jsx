import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function SubmissionsPage() {
    const [submission, setSubmission] = useState([]);
    const { user, setUser, ready } = useContext(UserContext);
    useEffect(() => {
        if (ready) {
            axios.get('/submissions').then(response => {
                setSubmission(response.data);
            });
        }
    }, [ready]);
    if (!ready) {
        return 'Loading..';
    }
    return (
        <div>
            <div className="text-center mt-12 p-12 text-lg">{user.username} Submissions</div>
            <div className="px-10 bg-white my-2 grid grid-cols-5 gap-3 divide-x font-semibold">
                <h1>When</h1>
                <h1>Who</h1>
                <h1>Problem</h1>
                <h1>Language</h1>
                <h1>Status</h1>
            </div>
            {submission.length > 0 && submission.map(submissions => (
                <div className="px-10 bg-white my-2 grid grid-cols-5 gap-3 divide-x">
                    <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.submittedAt}</h2>
                    <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.owner}</h2>
                    <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.name}</h2>
                    <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.language}</h2>
                    <h2 className="text-lg text-gray-700 px-2 py-1">{submissions.result}</h2>
                    
    


                </div>
            ))}
        </div>
    );
}

