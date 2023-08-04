import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Compiler from "../Compiler";
export default function ProblemPage() {
    const { id } = useParams();
    const [prob, setProb] = useState(null);

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

            <div className="mb-4 grid grod-cols-1 md:grid-cols-2 gap-2 ml-12">
                <div className="max-h-screen overflow-y-auto">
                    <h1 className="text-2xl font-semibold py-2">Problem</h1>
                    {prob.statement}
                    <h1 className="text-2xl font-semibold py-2">Input Format</h1>
                    {prob.inputformat}
                    <h1 className="text-2xl font-semibold py-2">Output Format</h1>
                    {prob.outputformat}
                    <h1 className="text-xl font-semibold py-2">Examples</h1>
                    <div className="bg-slate-200 grid grid-cols-2 divide-x divide-slate-400">
                        <div className="px-4 py-2">
                            <h3 className="py-1">Input</h3>
                            <div className="max-h-60 overflow-y-auto">
                                {sampleInputLines.map((line, index) => <p key={index}>{line}</p>)}
                            </div>
                        </div>
                        <div className="px-4 py-2">
                            <h3 className="py-1">Output</h3>
                            {sampleOutputLines.map((line, index) => <p key={index}>{line}</p>)}
                        </div>
                    </div>
                </div>
                <div>
                    <Compiler inbuiltinput={prob.inbuiltinput}/>
                </div>
            </div>
        </div>
    );
}