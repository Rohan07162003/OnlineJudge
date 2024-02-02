import { useState,useEffect } from "react";
import axios from "axios";
import { Navigate,useParams } from "react-router-dom";
export default function ProblemsFormPage() {
    const {id}=useParams();
    const [name, setName] = useState('');
    const [statement, setStatement] = useState('');
    const [sampleInput, setSampleinput] = useState('');
    const [sampleOutput, setSampleoutput] = useState('');
    const [inputformat, setInputformat] = useState('');
    const [outputformat, setOutputformat] = useState('');
    const [inbuiltinput, setInbuiltinput] = useState('');
    const [inbuiltoutput, setInbuiltoutput] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [redirect, setRedirect] = useState(false);
    useEffect(()=>{
        if(!id)return;
        axios.get('/problems/'+id).then(response=>{
            const {data}=response;
            setName(data.name);
            setStatement(data.statement);
            setSampleinput(data.sampleInput);
            setSampleoutput(data.sampleOutput);
            setInputformat(data.inputformat);
            setOutputformat(data.outputformat);
            setInbuiltinput(data.inbuiltinput);
            setInbuiltoutput(data.inbuiltoutput);
            setDifficulty(data.difficulty);
        })
    },[id])
    async function saveProb(ev) {
        ev.preventDefault();
        const problemdata={name, statement,inputformat,outputformat, sampleInput, sampleOutput,inbuiltinput,inbuiltoutput,difficulty}
        if(id){
            try {
                await axios.put('/problems', {id,...problemdata});
                setRedirect(true);
            } catch (e) {
                alert("An error occurred1");
                console.log(e.message);
            }
        }else{
            await axios.post('/problems', problemdata);
            setRedirect(true);
        }
        
        console.log("inside function");
    }
    if(redirect){
        return <Navigate to={'/problemset'}/>
    }    
    
    return (

        <div className="mt-8 px-2">
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
                <h2 className="text-2xl mt-4">Test Case 2 Output</h2>
                <textarea placeholder="2nd test case" className="h-48 md:h-32 " value={inbuiltoutput} onChange={ev => setInbuiltoutput(ev.target.value)}></textarea>
                <h2 className="text-2xl mt-4">Difficulty</h2>
                <textarea placeholder="easy/medium/hard" className="h-48 md:h-32 " value={difficulty} onChange={ev => setDifficulty(ev.target.value)}></textarea>
                <button className="primary my-4 hover:bg-opacity-95">Save</button>
            </form>
        </div>
    );
}