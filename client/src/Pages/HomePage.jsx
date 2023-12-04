import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import { Hero } from "../Hero.jsx";
export default function HomePage() {

    return (
        <div className="bg-black h-[150vh]">
            
            <Hero />
        </div>

    );
}