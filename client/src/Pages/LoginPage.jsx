import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
export default function LoginPage(){
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    
    

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-16">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" >
                    <input type="email" placeholder="youremail.com" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-grey-400">
                        Dont have an account yet?
                        <Link className="underline text-black" to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}