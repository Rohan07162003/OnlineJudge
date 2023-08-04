import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);

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
        <div className="mt-32">

            <div className="text-center max-w-large mx-auto ">
                Logged in as {user.name} ({user.email})<br />
                <button onClick={logout} className="primary max-w-sm mt-2 hover:bg-opacity-95">Logout</button>
            </div>
        </div>
    );
}