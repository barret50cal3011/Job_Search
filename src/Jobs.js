const show_add_job_button = document.getElementById("show-add-job-button");
const show_search_job_button = document.getElementById("show-search-button");

const add_section = document.getElementById("add-job");
const job_search_section = document.getElementById("job-search");
const current_jobs_section = document.getElementById("current-jobs");

const input_company_name = document.getElementById("input-company-name");
const search_button = document.getElementById("search-button");

function init(){
    show_add_job_button.addEventListener("click", show_add_job);
    show_search_job_button.addEventListener("click", show_find_jobs);

    search_button.addEventListener("click", search_by_company);
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

init();