import { useContext, useState, useEffect } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
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

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [subs, setsubs] = useState([]);
    useEffect(() => {
        axios.get('/user-submissions').then(({ data }) => {
            setsubs(data);
        });
    }, []);
    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }
    if (!ready) {
        return 'Loading..';
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }



    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="pt-32 bg-gray-900">

            <div className="text-center max-w-large mx-auto text-gray-400">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="primary max-w-sm mt-2 hover:bg-opacity-95">Logout</button>
            </div>
            <div class="flex flex-col items-center w-screen min-h-screen bg-gray-900 pb-5 pt-20">


                <h1 class="text-lg text-gray-400 font-medium">{user.username} Submissions</h1>
                <div class="flex flex-col mt-6">
                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="shadow overflow-hidden sm:rounded-lg">
                                <table class="min-w-full text-sm text-gray-400">
                                    <thead class="bg-gray-800 text-xs uppercase font-medium">
                                        <tr>
                                            <th></th>
                                            <th scope="col" class="pr-2 pl-4 md:px-6 py-3 text-left tracking-wider">
                                            Date/Time
                                            </th>
                                            <th scope="col" class="px-1 md:px-9 py-3 text-left tracking-wider">
                                            Username
                                            </th>
                                            <th scope="col" class="px-1 md:px-9 py-3 text-left tracking-wider">
                                                Problem
                                            </th>
                                            <th scope="col" class="px-1 md:px-8 py-3 text-left tracking-wider hidden md:block">
                                            Lang
                                            </th>
                                            <th scope="col" class="pl-2 pr-1 md:pl-9 md:pr-12 py-3 text-left tracking-wider">
                                            Result
                                            </th>

                                        </tr>
                                    </thead>
                                    {subs.length > 0 && subs.map((submissions, index) => (
                                        <tbody class="bg-gray-800">

                                            <tr key={index} className={index % 2 === 1 ? "bg-gray-800" : "bg-black bg-opacity-20"}>
                                                <td class="pl-0 md:pl-4">
                                                
                                                </td>
                                                <td class="flex pr-2 pl-4 px-2 md:px-6 py-4 whitespace-nowrap">
                                                    {formatDateTimeWithDefaultTimeZone(submissions.submittedAt)}
                                                </td>
                                                <td class="px-1 md:px-9 py-4 whitespace-nowrap">
                                                   {submissions.owner}
                                                </td>
                                                <td class="px-1 md:px-9 py-4 whitespace-nowrap">
                                                    
                                                    {submissions.name}
                                                </td>
                                                <td class="px-1 md:px-9 py-4 whitespace-nowrap hidden md:block">
                                                    {submissions.language}
                                                </td>
                                                {submissions.result === "Accepted!" && (
                                                    <td class="pl-2 pr-4 md:px-9 py-4 whitespace-nowrap text-green-400">{submissions.result}</td>
                                                )}
                                                {submissions.result === "Wrong answer on test case 2" && (
                                                    <td class="pl-2 pr-4 md:px-9 py-4 whitespace-nowrap text-red-400">WA on test case 2</td>
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
    );
}