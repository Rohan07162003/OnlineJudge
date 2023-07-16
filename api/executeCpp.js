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
const executeCpp=(filePath)=>{
    const jobId=path.basename(filePath).split(".")[0];
    const outpath=path.join(outputpath,`${jobId}.exe`);
    return new Promise((resolve,reject)=>{
        exec(
            `g++ ${filePath} -o ${outpath} && cd ${outputpath} && .\\${jobId}.exe`,
            (error,stdout,stderr)=>{
                if(error){
                    reject({error});
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