const express = require("express");
const cors = require("cors");

let jobs = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/add/:job", (req, res) =>{
    let job = req.body.job;
    jobs.push(job);
    
    res.end();
});

app.post("/search/:company", (req, res) => {
    let company = req.body.company;
    console.log("Looking for:" + company);

    let searched_jobs = [];
    for(let i = 0; i < jobs.length; i++){
        if(jobs[i].company === company){
            searched_jobs.push(jobs[i]);
        }
    }

    console.log(searched_jobs);

    res.end();
})

app.listen(8080, () => {
    console.log("Listening");
});
