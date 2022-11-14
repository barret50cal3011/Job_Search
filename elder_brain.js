const express = require("express");
const cors = require("cors");

let jobs = [];

const app = express();

app.use(express.static("./front"));
app.use(cors());
app.use(express.json());

function comp_job(job1 ,job2){
    return (
        job1.source === job2.source &&
        job1.link === job2.link &&
        job1.company === job2.company &&
        job1.position === job2.position &&
        job1.date === job2.date
    );
}

app.post("/add/:job", (req, res) =>{
    let new_job = req.body.job;
    let is_added = false;
    jobs.forEach((job) => {
        is_added = comp_job(job, new_job);
    });

    if(!is_added){
        jobs.push(new_job);
    }
    
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

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    res.send({searched_jobs});
});

app.post("/edit/:job_to_edit", (req, res) => {
    let job_to_edit = req.body.job_to_edit;
    let new_status = req.body.new_status;

    jobs.forEach((job) => {
        if(comp_job(job, job_to_edit)){
            job.status = new_status;
        }
    });

    res.end();
});

app.listen(8080, () => {
    console.log("Listening");
});
