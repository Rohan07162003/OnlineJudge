import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
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
                <div className="text-center text-lg text-offwhite font-medium pb-4 pt-10">Submissions</div>
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
                                                        <Link to={`/profile/${submissions.owner}`}>{submissions.owner}</Link>
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
            </div>
        </div>
    );

}

