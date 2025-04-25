document.addEventListener("DOMContentLoaded", function () {
    // Button references
    const runBtn = document.getElementById("run-btn");
    const clearBtn = document.getElementById("clear-btn");
    const saveBtn = document.getElementById("save-btn");

    // Input fields and checkboxes references
    const urlInput = document.getElementById("url");
    const endpointInput = document.getElementById("endpoint");
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

        showMessage("Ready to run tests (not implemented).");
        console.log("Running tests with the following details:");
        console.log("URL:", url);
        console.log("Endpoint:", endpoint);
        console.log("Data Type:", datatype);
        console.log("Selected Tests:", selectedTests);
    });

    // Clear button handler
    clearBtn.addEventListener("click", function () {
        urlInput.value = "";
        endpointInput.value = "";
        datatypeSelect.selectedIndex = 0;
        checkboxes.forEach(cb => cb.checked = false);
        showMessage("");
    });

    // Save button handler
    saveBtn.addEventListener("click", async function () {
        const url = urlInput.value.trim();
        const endpoint = endpointInput.value.trim();
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