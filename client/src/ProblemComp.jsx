export default function ProblemComp({ prob }) {
    const sampleInputLines = prob.sampleInput.split('\n').filter(line => line.trim() !== '');
    const sampleOutputLines = prob.sampleOutput.split('\n').filter(line => line.trim() !== '');
    return (
        <>
            <div className="min-h-screen overflow-y-auto bg-gray-800 rounded-xl text-gray-400 px-4 pb-4">
                <h1 className="md:text-2xl text-lg font-semibold pt-4 pb-4">Problem</h1>
                <p className="text-sm md:text-base">{prob.statement}</p>
                <h1 className="md:text-2xl text-lg font-semibold py-4">Input Format</h1>
                <p className="text-sm md:text-base">{prob.inputformat}</p>
                <h1 className="md:text-2xl text-lg font-semibold py-4">Output Format</h1>
                <p className="text-sm md:text-base">{prob.outputformat}</p>
                <h1 className="md:text-xl text-lg font-semibold py-4">Examples</h1>
                <div className="bg-black bg-opacity-20 grid grid-cols-2 divide-x divide-slate-800">
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