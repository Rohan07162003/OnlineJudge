export default function ProblemComp({ prob }) {
    const sampleInputLines = prob.sampleInput.split('\n').filter(line => line.trim() !== '');
    const sampleOutputLines = prob.sampleOutput.split('\n').filter(line => line.trim() !== '');
    return (
        <>
            <div className="max-h-screen overflow-y-auto">
                <h1 className="text-2xl font-semibold pt-3 pb-2">Problem</h1>
                {prob.statement}
                <h1 className="text-2xl font-semibold py-2">Input Format</h1>
                {prob.inputformat}
                <h1 className="text-2xl font-semibold py-2">Output Format</h1>
                {prob.outputformat}
                <h1 className="text-xl font-semibold py-2">Examples</h1>
                <div className="bg-slate-200 grid grid-cols-2 divide-x divide-slate-400">
                    <div className="px-4 py-2">
                        <h3 className="py-1">Input</h3>
                        <div className="max-h-60 overflow-y-auto">
                            {sampleInputLines.map((line, index) => <p key={index}>{line}</p>)}
                        </div>
                    </div>
                    <div className="px-4 py-2">
                        <h3 className="py-1">Output</h3>
                        {sampleOutputLines.map((line, index) => <p key={index}>{line}</p>)}
                    </div>
                </div>
            </div>
        </>
    );
}