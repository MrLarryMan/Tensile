document.addEventListener("DOMContentLoaded", function () {
    const jobSelect = document.getElementById("jobselect");
    const detailsBox = document.getElementById("details-box");
    const deleteModal = document.getElementById("confirm-delete-modal");
    const jobFormModal = document.getElementById("job-form-modal");
    const jobForm = document.getElementById("job-form");
    
    let currentJobs = [];
    let selectedJobId = null;

    const API_BASE_URL = 'http://localhost:3000/api/saved-jobs';

    initPage();

    jobSelect.addEventListener("change", handleJobSelect);
    document.getElementById("run-btn").addEventListener("click", handleRunJob);
    document.getElementById("edit-btn").addEventListener("click", handleEditJob);
    document.getElementById("delete-btn").addEventListener("click", handleDeleteJob);
    document.getElementById("confirm-modal-yes").addEventListener("click", confirmDelete);
    document.getElementById("confirm-modal-no").addEventListener("click", () => deleteModal.close());
    document.getElementById("cancel-form").addEventListener("click", () => jobFormModal.close());
    jobForm.addEventListener("click", handleFormSubmit);

    async function initPage() {
        try {
            await fetchJobs();
            detailsBox.style.display = "none";
            
        } catch (error) {
            console.error("Error initializing page:", error);
            alert("Failed to load saved jobs. Please try again.");
        }
    }

    async function fetchJobs() {
        try {
            const response = await fetch(API_BASE_URL);
            if (!response.ok) throw new Error('Failed to fetch jobs');
            
            currentJobs = await response.json();
            populateJobSelect(currentJobs);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            throw error;
        }
    }

    function populateJobSelect(jobs) {
        jobSelect.innerHTML = '<option value="">-- Select a Job --</option>';
        jobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.jobId;
            option.textContent = job.jobName;
            jobSelect.appendChild(option);
        });
    }

    function handleJobSelect(event) {
        selectedJobId = parseInt(event.target.value);
        if (!selectedJobId) {
            detailsBox.style.display = "none";
            return;
        }

        const selectedJob = currentJobs.find(job => job.jobId === selectedJobId);
        if (selectedJob) {
            displayJobDetails(selectedJob);
            detailsBox.style.display = "block";
        }
    }

    function displayJobDetails(job) {
        document.getElementById("jobId").textContent = job.jobId;
        document.getElementById("job-name").textContent = job.jobName;
        document.getElementById("url").textContent = job.url;
        document.getElementById("endpoint").textContent = job.endpoint;
        document.getElementById("test-options").textContent = JSON.stringify(job.selectedTests, null, 2);
        document.getElementById("datatype").textContent = job.datatype;
        document.getElementById("parameter").textContent = job.parameter;
    }

    async function handleRunJob() {
        if (!selectedJobId) {
            alert("Please select a job first");
            return;
        }

        const options = {
            method: 'POST',
        };
        
        try {
            const response = await fetch(`http://localhost:3000/api/jobrun/runJob/${selectedJobId}`, options);
            if (!response.ok) {
                const err = await response.json();
                alert("Failed to run job: " + (err.error || response.statusText), true);
                return;
            }
            alert("Job run successfully!");
        } catch (error) {
            alert("Failed to run job: " + error.message, true);
        }
    }

    function handleEditJob() {
        if (!selectedJobId) {
            alert("Please select a job first");
            return;
        }
        
        const jobToEdit = currentJobs.find(job => job.jobId === selectedJobId);
        if (jobToEdit) {
            document.getElementById("form-jobName").value = jobToEdit.jobName;
            document.getElementById("form-url").value = jobToEdit.url;
            document.getElementById("form-endpoint").value = jobToEdit.endpoint;
            document.getElementById("form-parameter").value = jobToEdit.parameter;
            document.getElementById("form-datatype").value = jobToEdit.datatype;
            jobFormModal.showModal();
        }
    }


    function handleDeleteJob() {
        if (!selectedJobId) {
            alert("Please select a job first");
            return;
        }
        deleteModal.showModal();
    }

    async function confirmDelete() {
        try {
            const response = await fetch(`${API_BASE_URL}/${selectedJobId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete job');
            
            await fetchJobs();
            detailsBox.style.display = "none";
            deleteModal.close();
            alert("Job deleted successfully");
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Failed to delete job. Please try again.");
        }
    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const jobName = document.getElementById("form-jobName").value;
        const url = document.getElementById("form-url").value;
        const endpoint = document.getElementById("form-endpoint").value;
        const parameter = document.getElementById("form-parameter").value;
        const datatype = document.getElementById("form-datatype").value;
        const selectedTests = document.getElementById("test-options").value;

        const jobData = {
            jobId: selectedJobId,
            jobName: jobName,
            url: url,
            endpoint: endpoint,
            parameter: parameter,
            selectedTests: selectedTests,
            datatype: datatype,
        };
        
        // if we have a jobId, we're updating, otherwise creating
        const isUpdate = true;
        
        try {
            const response = await fetch(
                isUpdate ? `${API_BASE_URL}/${selectedJobId}` : API_BASE_URL,
                {
                    method: isUpdate ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jobData)
                }
            );
            
            if (!response.ok) throw new Error(isUpdate ? 'Failed to update job' : 'Failed to create job');
            
            await fetchJobs();
            jobFormModal.close();
            alert(`Job ${isUpdate ? 'updated' : 'created'} successfully`);
        } catch (error) {
            console.error(`Error ${isUpdate ? 'updating' : 'creating'} job:`, error);
            alert(`Failed to ${isUpdate ? 'update' : 'create'} job. Please try again.`);
        }
    }
});
