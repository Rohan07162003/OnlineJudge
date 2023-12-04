import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import Compiler from "../Compiler";
import ProblemSubs from "../ProblemSubs.jsx";
import ProblemComp from "../ProblemComp.jsx";

export default function ProblemPage() {
    const { id } = useParams();
    const [prob, setProb] = useState(null);
    const [subs, setsubs] = useState([]);
    const [subson, setSubson] = useState('prob');
    const { user } = useContext(UserContext);
    useEffect(() => {
        axios.get('/problemsubmissions', { params: { id: id } }).then(({ data }) => {
            setsubs(data);
        });
    }, []);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/problems/${id}`).then(response => {
            setProb(response.data);
        });
    }, [id])
    if (!prob) return '';
    const sampleInputLines = prob.sampleInput.split('\n').filter(line => line.trim() !== '');
    const sampleOutputLines = prob.sampleOutput.split('\n').filter(line => line.trim() !== '');
    return (
        <div className="mt-2 -mx-8 px-8 p2-6 pb-0">
            <div className="flex items-center gap-6 bg-gray-100 pl-12 py-6 shadow">
                <Link to={'/problemset'} className="p-1 bg-slate-200 border rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-primary w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>
                </Link>

                <h1 className="text-2xl font-semibold">{prob.name}</h1>
            </div>
            <div className="w-1/4">
                <div className="flex justify-start gap-14 ml-12 text-gray-500">
                    <button onClick={() => setSubson("prob")} className={`text-base font-semibold py-2 px-4 ${subson === "prob" ? "border-b-2 border-primary" : ""
                        }`}>Statement</button>
                    <button onClick={() => setSubson("sub")} className={`text-base font-semibold py-2 px-4 ${subson === "sub" ? "border-b-2 border-primary" : ""
                        }`}>Submissions</button>
                    {!!user && (user.role.toLowerCase() === "problemsetter") && (
                        <Link to={"/setproblem/" + id} className="text-base font-semibold py-2 px-4">Edit</Link>
                    )}
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 ml-3 mr-2 md:ml-12">
                {subson === 'prob' && (
                    <ProblemComp prob={prob} />
                )}
                {subson === 'sub' && (
                    <ProblemSubs subs={subs} />
                )}
                <div>
                    <Compiler inbuiltinput={prob.inbuiltinput} inbuiltoutput={prob.inbuiltoutput} test1output={prob.sampleOutput} problemname={prob.name} problemid={id} />
                </div>
            </div>
        </div>
    );
}