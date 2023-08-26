import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Compiler from "../Compiler";
function formatDateTimeWithDefaultTimeZone(inputDateStr) {
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const inputDate = new Date(inputDateStr);
    const offsetMillis = 5.5 * 60 * 60 * 1000;
    const localDate = new Date(inputDate.getTime() + offsetMillis);

    const month = monthNames[localDate.getMonth()];
    const day = String(localDate.getDate()).padStart(2, '0');
    const year = localDate.getFullYear();
    const hours = String(localDate.getHours()).padStart(2, '0');
    const minutes = String(localDate.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}`;
    return formattedDateTime;
}

export default function UserProblemSubmission() {
    const { id } = useParams();
    const [prob, setProb] = useState(null);
    const [subs, setsubs] = useState([]);
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



    //const { data: dataRes } = await axios.get("/status", { params: { id: data.jobId } });
    if (!prob) return '';
    return (
        <div className="mt-2 -mx-8 px-1 md:px-8 p2-6 pb-0">
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
                    <Link to={'/problem/' + id} className="text-base font-semibold py-2 px-4">Statement</Link>
                    <h2 className="text-base font-semibold border-b-2 border-primary py-2 px-4">Submissions</h2>
                </div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-2 mx-5 mt-2">
                <div class="flex flex-col min-h-screen pb-5 pt-4">

                    <div class="flex flex-col">
                        <div class="-my-2 overflow-x-auto">
                            <div class="py-2 inline-block min-w-full ">
                                <div class="shadow overflow-hidden sm:rounded-lg">
                                    <table class="min-w-full text-sm text-gray-400">
                                        <thead class="bg-gray-800 text-xs uppercase font-medium">
                                            <tr>
                                                
                                                <th scope="col" class="px-4 lg:px-10 py-3 text-left tracking-wider">
                                                    Date/Time
                                                </th>
                                                <th scope="col" class="px-3 lg:px-9 py-3 text-left tracking-wider">
                                                    Username
                                                </th>
                                                <th scope="col" class="px-3 lg:px-9 py-3 text-left tracking-wider">
                                                    Problem
                                                </th>
                                                <th scope="col" class="px-3 lg:px-9 py-3 text-left tracking-wider">
                                                    Lang
                                                </th>
                                                <th scope="col" class="px-3 lg:px-9 py-3 text-left tracking-wider">
                                                    Result
                                                </th>

                                            </tr>
                                        </thead>
                                        {subs.length > 0 && subs.map((submissions, index) => (
                                            <tbody class="bg-gray-800">

                                                <tr key={index} className={index % 2 === 1 ? "bg-gray-800" : "bg-black bg-opacity-20"}>
                                                    
                                                    <td class="flex px-4 lg:px-6 py-4 whitespace-nowrap">
                                                        {formatDateTimeWithDefaultTimeZone(submissions.submittedAt)}
                                                    </td>
                                                    <td class="px-3 lg:px-9 py-4 whitespace-nowrap">
                                                        {submissions.owner}
                                                    </td>
                                                    <td class="px-3 lg:px-9 py-4 whitespace-nowrap">

                                                        {submissions.name}
                                                    </td>
                                                    <td class="px-3 lg:px-9 py-4 whitespace-nowrap">
                                                        {submissions.language}
                                                    </td>
                                                    {submissions.result === "Accepted!" && (
                                                        <td class="px-3 lg:px-9 py-4 whitespace-nowrap text-green-400">{submissions.result}</td>
                                                    )}
                                                    {submissions.result === "Wrong answer on test case 2" && (
                                                        <td class="px-3 lg:px-9 pr-1 py-4 whitespace-nowrap text-red-400">WA on test case 2</td>
                                                    )}


                                                </tr>




                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div>
                    <Compiler inbuiltinput={prob.inbuiltinput} inbuiltoutput={prob.inbuiltoutput} test1output={prob.sampleOutput} problemname={prob.name} problemid={id} />
                </div>
            </div>
        </div>
    );
}