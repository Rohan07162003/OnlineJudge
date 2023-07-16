import fs, { writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const dirCodes=path.join(__dirname,'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}
const generateFile=(format,content)=>{
    const jobId=uuidv4();
    const fileName=`${jobId}.${format}`;
    const filePath=path.join(dirCodes,fileName);
    fs.writeFileSync(filePath,content);
    return filePath;
}
export default generateFile;