document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("details-box").style.display = "none";
    let jobs;
    try {
        jobs = await fetch('../data/saved_jobs.json').then(res => res.json());
    } catch (error) {
        throw new Error(`Error fetching from database ${error}`);
    }

    document.getElementById("jobselect").addEventListener('focus', function() {
        document.getElementById("jobselect").innerHTML = '<option value=""></option>  <!-- Blank option -->';

        console.log(jobs)
        jobs.forEach(job => {
            const opt = document.createElement('option');
            opt.value = job.id;
            opt.textContent = job.job_name;
            document.getElementById("jobselect").appendChild(opt);
        });
    });

    document.getElementById("jobselect").addEventListener("change", function() {
        const job_id = this.value;
        console.log(job_id);
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

    const confirm_modal = document.getElementById('confirm-delete-modal');
    const delete_confirmyes_btn = document.getElementById('confirm-modal-yes');
    const delete_confirmno_btn = document.getElementById('confirm-modal-no');

    delete_confirmyes_btn.addEventListener('click', () => {
        // TODO: Implement Logic
        confirm_modal.close();
    });

    delete_confirmno_btn.addEventListener('click', () => {
        // TODO: Implement Logic
        confirm_modal.close();
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
        confirm_modal.showModal();
        // TODO: Implement Logic
    });
});
