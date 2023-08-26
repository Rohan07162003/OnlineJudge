import { useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import stubs from "./defaultStubs";
export default function Compiler(props) {
    const inbuiltinput = props.inbuiltinput;
    const inbuiltoutput = props.inbuiltoutput;
    const test1output = props.test1output;
    const problemid=props.problemid;
    const name = props.problemname;
    const [owner,setOwner]= useState('');
    const [IsOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState('cpp');
    const [result,setResult]= useState('running');
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState('');
    const [jobId, setJobId] = useState('');
    const [input2, setInput2] = useState('');
    const [submittedAt, setSubmittedAt] = useState('');
    const { user, setUser } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);
    var f = 0;
    useEffect(() => {
        setCode(stubs[language]);
    }, [language]);
    useEffect(()=>{
        if(result === "Accepted!" || result === "Wrong answer on test case 2") {
            saveProb();
        }
    },[result])
    async function handlerun(ev) {
        f = 1;
        ev.preventDefault();
        try {
            setJobId("");
            setStatus("");
            setOutput("");
            const { data } = await axios.post("/run", { language, code, input });
            console.log(data);
            setJobId(data.jobId);
            let IntervalId;

            IntervalId = setInterval(async () => {
                const { data: dataRes } = await axios.get("/status", { params: { id: data.jobId } });
                const { success, job, error } = dataRes;
                console.log(dataRes);
                //const {status}=job;
                //if(status==="success"){
                //clearInterval(IntervalId);
                //}
                if (success) {
                    const { status: jobStatus, output: jobOutput } = job;

                    setStatus(jobStatus);
                    if (jobStatus === "pending") {
                        return;
                    }
                    setOutput(jobOutput);
                    clearInterval(IntervalId);
                } else {
                    setStatus("Error:Please retry!");
                    console.error(error);
                    clearInterval(IntervalId);
                    setOutput(error);
                }
                console.log(dataRes);
            }, 1000);

        } catch ({ response }) {
            if (response) {
                const errMsg = response.data.err.stderr;
                setOutput(errMsg);
                console.log(response);
            }
            else {
                setOutput('Error connecting to server');
            }
        }
    }
    async function saveProb() {
        //e.preventDefault();
        try {
            const data = {
                owner,
                name,
                language,
                result,
                submittedAt,
                problemid,
            };
            await axios.post('/submissions', data);
            setRedirect(true);
        } catch (e) {
            alert("An error occurred");
            console.log(e.message);
        }

    }
    async function handlesubmit(ev) {

        ev.preventDefault();
        if(user){
            setOwner(user.username); 

            try {

                setJobId("");
                setStatus("");
                setOutput("");
                setSubmittedAt(new Date());
                setInput2(inbuiltinput);
                const { data } = await axios.post("/submit", { language, code, input2 });
                console.log(data);
                setJobId(data.jobId);
                let IntervalId;

                IntervalId = setInterval(async () => {
                    const { data: dataRes } = await axios.get("/status", { params: { id: data.jobId } });
                    const { success, job, error } = dataRes;
                    console.log(dataRes);
                    //const {status}=job;
                    //if(status==="success"){
                    //clearInterval(IntervalId);
                    //}
                    if (success) {
                        const { status: jobStatus, output: jobOutput } = job;
                        setStatus(jobStatus);
                        if (jobStatus === "pending") {
                            return;
                        }
                        setOutput(jobOutput);
                        clearInterval(IntervalId);
                        console.log(inbuiltoutput);
                        console.log(status);
                        console.log(submittedAt);
                        if (jobOutput.trim() === inbuiltoutput.trim()) {
                            setResult("Accepted!");
                            setStatus("Accepted");
                            console.log(result);
                            console.log(submittedAt);
                        }
                        else {
                            
                            console.log(submittedAt);
                            setResult("Wrong answer on test case 2");
                            setStatus("Wrong answer on test case 2");
                            console.log(result);
                            
                        }
                        

                    } else {
                        setStatus("Error:Please retry!");
                        console.error(error);
                        clearInterval(IntervalId);
                        setOutput(error);
                    }
                    console.log(dataRes);

                }, 1000);

            } catch ({ response }) {
                if (response) {
                    const errMsg = response.data.err.stderr;
                    setOutput(errMsg);
                    console.log(response);
                }
                else {
                    setOutput('Error connecting to server');
                }
            }
        }
        else{
            !user(
                alert("Login to submit answer")
            )
        }

    }
    if (redirect) {
        return <Navigate to={'/submission'} />
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
            <div className="pt-1 mx-2 md:mx-12 border shadow-lg shadow-gray-800 px-2 md:px-8 shadow-md min-h-full bg-zinc-50">
                <div className="relative">
                    <div className="border mb-0">
                        <button onClick={toggleNavbar} className='mr-20 text-lg px-2 pt-2 pb-1'>
                            <div className="flex gap-2 items-center px-4 p1-2 bg-white shadow">
                                <div className="text-base py-1 w-12 flex">
                                    {language === "c" && (
                                        <div>C</div>
                                    )}
                                    {language === "cpp" && (
                                        <div>C++</div>
                                    )}
                                    {language === "py" && (
                                        <div>Python</div>
                                    )}

                                </div>
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
                    <div className="flex gap-4">
                        <button className="w-24 py-2 mt-3 mb-5 text-white bg-zinc-800 rounded-sm" onClick={handlerun}>Run</button>
                        <button className="w-24 py-2 mt-3 mb-5 text-white bg-zinc-800 rounded-sm" onClick={handlesubmit}>Submit</button>
                    </div>
                    <div>
                        <span>Custom Input</span>
                        
                        <textarea className="h-36 rounded-md border" value={input} onChange={ev => setInput(ev.target.value)}></textarea>
                    </div>
                    <div className="px-3 py-1 border">
                        {!!status && (
                            <div className="flex gap-3 ">
                                <div><span className="font-semibold text-gray-800">Status  </span>  {status}</div>
                                <div>{jobId && `JobId  ${jobId}`}</div>
                            </div>
                        )}

                    </div>
                    {!!output && (
                        <div className="bg-white h-52 mb-24 border flex items-center justify-center">
                            <div className="h-40 w-11/12 bg-yellow-100 opacity-70 p-2 overflow-y-scroll">
                                <p className="text-black text-base">{output}</p>
                            </div>
                        </div>
                    )}
                    {/*<button className="w-24 py-2 mt-3 mb-5 text-white bg-zinc-800 rounded-sm" onClick={saveProb}>Submissions</button>*/}
                    
                </div>
            </div>
        </div>
    );
}
Compiler.defaultProps = {
    inbuiltinput: "no input",

}