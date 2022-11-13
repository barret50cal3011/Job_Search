const url = "http://localhost:8080";
const url_add = "/add";
const url_search = "/search";

const show_add_job_button = document.getElementById("show-add-job-button");
const show_search_job_button = document.getElementById("show-search-button");

const add_section = document.getElementById("add-job");
const job_search_section = document.getElementById("job-search");
const current_jobs_section = document.getElementById("current-jobs");

const input_company_name = document.getElementById("input-company-name");
const search_button = document.getElementById("search-button");

const input_source = document.getElementById("source-txt");
const input_link = document.getElementById("link-txt");
const input_company = document.getElementById("company-txt");
const input_position = document.getElementById("position-txt");
const input_date = document.getElementById("date-txt");
const input_status = document.getElementById("status-txt");
const button_add_job = document.getElementById("add-job-button");

function init(){
    show_add_job_button.addEventListener("click", show_add_job);
    show_search_job_button.addEventListener("click", show_find_jobs);

    search_button.addEventListener("click", search_by_company);
    button_add_job.addEventListener("click", add_job);
}

function show_add_job(){
    add_section.style.display = "flex";
    job_search_section.style.display = "none";
    current_jobs_section.style.display = "none";
}

function show_find_jobs(){
    job_search_section.style.display = "flex";
    add_section.style.display = "none";
    current_jobs_section.style.display = "none";
}

function show_jobs(searched_jobs){
    current_jobs_section.style.display = "flex";
    job_search_section.style.display = "none";

    searched_jobs.forEach((job) => {
        console.log(job);
        job_html = `
            <div class="job-info-section">
                <input type="radio" name="jobs" id="${job.company}-${job.position}-${job.date}" class="ratio-job">
                <label class="label-job" for="${job.company}-${job.position}-${job.date}">
                    <div class="job-info">
                        <p class="info-title">Source</p>
                        <p class="info-paragraph">${job.source}</p>
                    </div>
                    <div class="job-info">
                        <p class="info-title">Link</p>
                        <p class="info-paragraph">${job.link}</p>
                    </div>
                    <div class="job-info">
                        <p class="info-title">Company</p>
                        <p class="info-paragraph">${job.company}</p>
                    </div>
                    <div class="job-info">
                        <p class="info-title">Position</p>
                        <p class="info-paragraph">${job.position}</p>
                    </div>
                    <div class="job-info">
                        <p class="info-title">Date</p>
                        <p class="info-paragraph">${job.date}</p>
                    </div>
                    <div class="job-info">
                        <p class="info-title">Status</p>
                        <p class="info-paragraph">${job.status}</p>
                    </div>
                </label>
            </div>
        `

        current_jobs_section.innerHTML += job_html;
    });
}

function search_by_company(){
    if(input_company_name === ""){
        alert("You haven't provided the requierd information");
    }else{
        let company = input_company_name.value;

        fetch(url + url_search + `/${company}`, {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                company
            })
        }).then(function (res){
            if(res.ok){
                res.json().then(function ({searched_jobs}){
                    show_jobs(searched_jobs);
                })
            }
        });
    }
}

function add_job(){

     if(
        input_source.value === "" ||
        input_link.value === "" ||
        input_company.value === "" ||
        input_position.value === "" ||
        input_date.value === "" ||
        input_status.value === ""
    ){
        alert("You haven't provided the information requiered");
    }else{
        let job = {
            source: input_source.value,
            link: input_link.value,
            company: input_company.value,
            position: input_position.value,
            date: input_date.value,
            status: input_status.value
        };
    
        fetch(url + url_add + `/${job}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job
            })
        });
    }
    //TODO: get the jobs from the server
}

function edit_job(){

}

init();