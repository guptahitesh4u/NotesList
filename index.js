import express from "express";
import bodyParser  from "body-parser";
import fs from "fs"
import readline from "readline";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));

const port=3000;
var notes=[]
const app=express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (req,res)=>{
    await readFromFile();
    await res.render("index.ejs",{notes:notes});
})

app.post("/edit", async (req,res)=>{
    await readFromFile();
   
    await res.render("index.ejs",{notes:notes});

})

app.post("/delete",(req,res)=>{
    readFromFile();
    console.log(notes);
    console.log("printer notes delete");
    res.render("index.ejs");
   
})
async function readFromFile(){
    const fileStream = fs.createReadStream(__dirname+"/public/noteslist.txt");
    notes=[];
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        notes.push(line);
        console.log(`Line: ${line}`);
    });

    rl.on('close', () => {
        console.log('Finished reading the file.');
        console.log(notes);
    });

    
}
app.post("/delete",(req,res)=>{
    res.render("index.ejs");
    console.log(req.body);
})


app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});