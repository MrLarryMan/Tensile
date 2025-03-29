document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("details-box").style.display = "none";
    const jobs = { // eventually replaced by a database
        "test": { job_name: "Test_Job_1", url: "http://test_job_1", endpoint: "/api/sensors", test_options: { option1: true, option2: false}, datatype: "base64"},
        "test2": { job_name: "Test_Job_2", url: "http://test_job_2", endpoint: "/api/app", test_options: { option1: true, option2: false}, datatype: "JSON"}
    };

    document.getElementById("jobselect").addEventListener("change", function() {
        const job_id = this.value;
        const details_div = document.getElementById("details-box");

        if (job_id && jobs[job_id]) {
            document.getElementById("job-name").innerText = jobs[job_id].job_name;
            document.getElementById("url").innerText = jobs[job_id].url;
            document.getElementById("endpoint").innerText = jobs[job_id].endpoint;
            document.getElementById("test-options").innerText = JSON.stringify(jobs[job_id].test_options);
            document.getElementById("datatype").innerText = jobs[job_id].datatype;
            details_div.style.display = "block";
        } else {
            details_div.style.display = "none";
        }
    });

    document.getElementById("run-btn").addEventListener("click", function () {
        alert("Running job");
        // TODO: Implement Logic
    });
    document.getElementById("edit-btn").addEventListener("click", function () {
        alert("Editing job");
        // TODO: Implement Logic
    });
    document.getElementById("delete-btn").addEventListener("click", function () {
        alert("Deleting job");
        // TODO: Implement Logic
    });
});
