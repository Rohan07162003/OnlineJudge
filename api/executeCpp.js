import fs, { writeFileSync } from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { stderr } from "process";
import { exec } from "child_process";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const outputpath=path.join(__dirname,'outputs');
if(!fs.existsSync(outputpath)){
    fs.mkdirSync(outputpath,{recursive:true});
}
const executeCpp=(filePath,input)=>{
    const jobId=path.basename(filePath).split(".")[0];
    const outpath=path.join(outputpath,`${jobId}.exe`);
    const inpath=path.join(outputpath,`input.txt`);
    fs.writeFileSync(inpath,input);
    return new Promise((resolve,reject)=>{
        exec(
            `g++ ${filePath} -o ${outpath} && cd ${outputpath} && .\\${jobId}.exe < input.txt`,
            (error,stdout,stderr)=>{
                if(error){
                    reject({error,stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    })
};
export default executeCpp;