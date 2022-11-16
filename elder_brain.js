const express = require("express");
const cors = require("cors");

//list with all the job postulations
let jobs = [];

const app = express();

app.use(express.static("./front"));
app.use(cors());
app.use(express.json());

//compares 2 jobs to see if they are equal
function comp_job(job1 ,job2){
    return (
        job1.source === job2.source &&
        job1.link === job2.link &&
        job1.company === job2.company &&
        job1.position === job2.position &&
        job1.date === job2.date
    );
}

// gets the job that will be added to the list and adds it
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

//search the postulations on the list
app.post("/search/:company", (req, res) => {
    let company = req.body.company || "";

    let searched_jobs = [];
    for(let i = 0; i < jobs.length; i++){
        if(jobs[i].company === company || company === ""){
            searched_jobs.push(jobs[i]);
        }
    }

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    res.send({searched_jobs});
});

//gets a job and the new status for the job and changes the status of the given job in the list
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

//gets all the job postulations in the list
app.get("/get-all/", (req, res) => {
    all_jobs = [];
    jobs.forEach((job) => {
        all_jobs.push(job);
    });

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    
    res.send({all_jobs});
});

//start the server
app.listen(8080, () => {
    console.log("Listening");
});
