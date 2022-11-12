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
}

function show_find_jobs(){
    job_search_section.style.display = "flex";
    add_section.style.display = "none";
}

function search_by_company(){
    alert("You are looking for " + input_company_name.value);
    //TODO: add server link
}

function add_job(){
    let job = {
        source: input_source.value,
        link: input_link.value,
        company: input_company.value,
        position: input_position.value,
        date: input_date.value,
        status: input_status.value
    };

    //TODO: send the new job to the server
}

init();