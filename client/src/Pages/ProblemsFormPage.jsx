import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function ProblemsFormPage() {
    const [name, setName] = useState('');
    const [statement, setStatement] = useState('');
    const [sampleInput, setSampleinput] = useState('');
    const [sampleOutput, setSampleoutput] = useState('');
    const [inputformat, setInputformat] = useState('');
    const [outputformat, setOutputformat] = useState('');
    const [inbuiltinput, setInbuiltinput] = useState('');
    const [redirect, setRedirect] = useState(false);


    async function saveProb(ev) {
        ev.preventDefault();
        try {
            const data = { name, statement,inputformat,outputformat, sampleInput, sampleOutput,inbuiltinput };
            await axios.post('/problems', data);
            setRedirect(true);
        } catch (e) {
            alert("An error occurred");
            console.log(e.message);
        }
        console.log("inside function");
    }
    if(redirect){
        return <Navigate to={'/problemset'}/>
    }    
    
    return (

        <div className="mt-8">
            <form onSubmit={saveProb}>
                <h2 className="text-2xl mt-4">Problem</h2>
                <input type="text" placeholder="problem name" value={name} onChange={ev => setName(ev.target.value)} />
                <h2 className="text-2xl mt-4">Problem Statement</h2>
                <textarea placeholder="problem statement" className="h-72 md:h-56 lg:h-48 " value={statement} onChange={ev => setStatement(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Input Format</h2>
                <textarea placeholder="problem statement" className="h-72 md:h-56 lg:h-48 " value={inputformat} onChange={ev => setInputformat(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Output Format</h2>
                <textarea placeholder="problem statement" className="h-72 md:h-56 lg:h-48 " value={outputformat} onChange={ev => setOutputformat(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Sample Input</h2>
                <textarea placeholder="input" className="h-48 md:h-32" value={sampleInput} onChange={ev => setSampleinput(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Sample Output</h2>
                <textarea placeholder="output" className="h-48 md:h-32 " value={sampleOutput} onChange={ev => setSampleoutput(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Test Case 2</h2>
                <textarea placeholder="2nd test case" className="h-48 md:h-32 " value={inbuiltinput} onChange={ev => setInbuiltinput(ev.target.value)}></textarea>
                <button className="primary my-4 hover:bg-opacity-95">Save</button>
            </form>
        </div>
    );
}