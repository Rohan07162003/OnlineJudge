import { useState, useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function SubmissionsPage(){
    const { user, setUser,ready } = useContext(UserContext);
    if (!ready) {
        return 'Loading..';
    }
    return (
        <div className="text-center mt-12 p-12">{user.username} Submissions</div>
    );
}

