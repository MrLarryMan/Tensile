document.addEventListener("DOMContentLoaded", function () {
    // Button references
    const runBtn = document.getElementById("run-btn");
    const clearBtn = document.getElementById("clear-btn");
    const saveBtn = document.getElementById("save-btn");

    // Input fields and checkboxes references
    const urlInput = document.getElementById("url");
    const endpointInput = document.getElementById("endpoint");
    const parameterInput = document.getElementById("parameter");
    const requestTypeSelect = document.getElementById("request_type");
    const datatypeSelect = document.getElementById("datatype");
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    // Helper for URL validation
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Helper for endpoint validation
    function isValidEndpoint(endpoint) {
        return endpoint.startsWith("/") && !/\s/.test(endpoint);
    }

    // // Helper for endpoint validation
    // function isValidParameter(parameter) {
    //     return parameter == null || !/\s/.test(parameter);
    // }

    // Helper for showing messages
    function showMessage(msg, isError = false) {
        let msgDiv = document.getElementById("job-msg");
        if (!msgDiv) {
            msgDiv = document.createElement("div");
            msgDiv.id = "job-msg";
            msgDiv.style.margin = "10px 0";
            document.querySelector(".job-spec-container").prepend(msgDiv);
        }
        msgDiv.textContent = msg;
        msgDiv.style.color = isError ? "red" : "green";
    }

    // Enter button handler
    runBtn.addEventListener("click", function () {
        const url = urlInput.value.trim();
        const endpoint = endpointInput.value.trim();
        const parameter = parameterInput.value.trim();
        parameter = parameter == "" ? null : parameter;
        const requestType = requestTypeSelect.value;
        const datatype = datatypeSelect.value;
        const selectedTests = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.name);

        if (!url || !endpoint) {
            showMessage("Please fill out the URL and Endpoint fields.", true);
            return;
        }
        if (!isValidUrl(url)) {
            showMessage("Please enter a valid URL (e.g., https://example.com).", true);
            return;
        }
        if (!isValidEndpoint(endpoint)) {
            showMessage("Please enter a valid endpoint (e.g., /v1/products). Endpoints must start with '/' and contain no spaces.", true);
            return;
        }

        // if (!isValidParameter(parameter)) {
        //     showMessage("Please enter a valid parameter, or leave it blank if non-applicable. Parameters must contain no spaces.", true);
        //     return;
        // }

        showMessage("Ready to run tests!");
        // console.log("Running tests with the following details:");
        // console.log("URL:", url);
        // console.log("Endpoint:", endpoint);
        // console.log("Request Type:", requestType);
        // console.log("Data Type:", datatype);
        // console.log("Selected Tests:", selectedTests);
        const options = {
            method: 'POST',
            body: {
                url: url,
                endpoint: endpoint,
                parameter: parameter,
                request_type: requestType,
                test_options: selectedTests,
                datatype: datatype
            }
        };
        // URL for testing. Port number may change in dev or production.
        fetch("127.0.0.1:3000/createAndRunJob", options)
    });

    // Clear button handler
    clearBtn.addEventListener("click", function () {
        urlInput.value = "";
        endpointInput.value = "";
        requestTypeSelect.selectedIndex = 0;
        datatypeSelect.selectedIndex = 0;
        checkboxes.forEach(cb => cb.checked = false);
        showMessage("");
    });

    // Save button handler
    saveBtn.addEventListener("click", async function () {
        const url = urlInput.value.trim();
        const endpoint = endpointInput.value.trim();
        const requestType = requestTypeSelect.value;
        const datatype = datatypeSelect.value;
        const selectedTests = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.name);

        if (!url || !endpoint) {
            showMessage("Please fill out the URL and Endpoint fields before saving.", true);
            return;
        }
        if (!isValidUrl(url)) {
            showMessage("Please enter a valid URL (e.g., https://example.com).", true);
            return;
        }
        if (!isValidEndpoint(endpoint)) {
            showMessage("Please enter a valid endpoint (e.g., /v1/products). Endpoints must start with '/' and contain no spaces.", true);
            return;
        }

        const jobDetails = {
            url,
            endpoint,
            requestType,
            datatype,
            selectedTests
        };

        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobDetails)
            });
            if (!response.ok) {
                const err = await response.json();
                showMessage("Failed to save job: " + (err.error || response.statusText), true);
                return;
            }
            showMessage("Job saved successfully!");
            // Clear form after save
            clearBtn.click();
        } catch (error) {
            showMessage("Failed to save job: " + error.message, true);
        }
    });
});