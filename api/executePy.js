
import path, { resolve } from "path";
import { fileURLToPath } from 'url';
import { stderr } from "process";
import { exec } from "child_process";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const executePy=(filePath)=>{
    
    return new Promise((resolve,reject)=>{
        exec(
            `python ${filePath}`,
            (error,stdout,stderr)=>{
                if(error){
                    reject({error, stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    })
};
export default executePy;