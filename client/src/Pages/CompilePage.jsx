import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
export default function CompilePage() {
    const [IsOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('C++');
    const [code, setCode]=useState('');
    const [output, setOutput]=useState('');
    const { user, setUser } = useContext(UserContext);
    async function handlesubmit(ev){
        ev.preventDefault();
        try{
            const {data}=await axios.post("/run",{language,code});
            setOutput(data);
            console.log(data);

        }catch({response}){
            if(response){
                const errMsg=response.data.err.stderr;
                setOutput(errMsg);
                console.log(response);
            }
            else{
                setOutput('Error connecting to server');
            }
        }
    }
    const toggleNavbar = () => {
        setIsOpen(!IsOpen);
    };
    function inputheader(text) {
        return (
            <h2 className="text-2xl text-gray-800 text-bold mt-4">{text}</h2>
        );
    }
    function inputDesc(text) {
        return (
            <p className="text-gray-500 text-sm md:text-base my-2">{text}</p>
        );
    }
    function preinput(header, description) {
        return (
            <>
                {inputheader(header)}
                {inputDesc(description)}
            </>
        );
    }
    return (
        <div className="px-1 mt-4 h-screen">
            <div className="pt-10 mx-2 md:mx-60 border shadow-lg shadow-gray-800 px-4 md:px-24 shadow-md min-h-full bg-zinc-50">
                <div className="relative">
                    {preinput('Code, Compile & Run', 'Compile & run your code with online IDE')}
                    <div className="border mb-0">
                        <button onClick={toggleNavbar} className='mr-20 text-lg px-2 pt-2 pb-1'>
                            <div className="flex gap-2 items-center px-4 p1-2 bg-white shadow">
                                <div className="text-base py-1 w-12 flex">{language}</div>
                                {!IsOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hover:bg-gray-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                )}
                                {IsOpen && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 hover:bg-gray-1003">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                    </svg>
                                )}



                            </div>
                            {IsOpen && (
                                <div className="flex flex-col justify-between absolute top-28 left-2 z-10 bg-white rounded-l drop-shadow-md shadow w-32 dark:bg-gray-700 dark:divide-gray-600">
                                    <button value="cpp" onClick={ev => setLanguage(ev.target.value)} className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm">C++</button>
                                    <button value="c" onClick={ev => setLanguage(ev.target.value)} className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm dark:hover:bg-gray-600 dark:hover:text-white">C</button>
                                    <button value="py" onClick={ev => setLanguage(ev.target.value)} className="flex block text-sm px-5 py-1 hover:bg-indigo-100 hover:rounded-sm">Python</button>
                                </div>
                            )}
                        </button>
                        <textarea className="h-96 rounded-md" value={code} onChange={ev => setCode(ev.target.value)}></textarea>
                    </div>
                    <button className="w-20 py-2 mt-1 mb-3 text-white bg-zinc-800 rounded-sm" onClick={handlesubmit}>Run</button>
                    <div className="bg-white h-52 mb-24 border flex items-center justify-center">
                        <div className="h-36 w-11/12 bg-yellow-100 opacity-70 p-2 overflow-y-scroll">
                            <p className="text-black text-base">{output}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}