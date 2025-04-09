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

    // IndexedDB setup
    let db;
    const request = indexedDB.open("JobDatabase", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("jobs")) {
            db.createObjectStore("jobs", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Success");
    };

    request.onerror = function (event) {
        console.error("Error with IndexDB:", event.target.error);
    };

    // Save job details to IndexedDB
    function saveToIndexedDB(jobDetails) {
        const transaction = db.transaction("jobs", "readwrite");
        const store = transaction.objectStore("jobs");
        const request = store.add(jobDetails);

        request.onsuccess = function () {
            alert("Success saving to IndexDB");
        };

        request.onerror = function (event) {
            console.error("Error Saving:", event.target.error);
            alert("Failed");
        };
    }

    // Retrieve all jobs from IndexedDB
    function getAllJobsFromIndexedDB() {
        const transaction = db.transaction("jobs", "readonly");
        const store = transaction.objectStore("jobs");
        const request = store.getAll();

        request.onsuccess = function () {
            console.log("Jobs Retrieved:", request.result);
            alert("Success");
        };

        request.onerror = function (event) {
            console.error("Error Retrieving Jobs", event.target.error);
            alert("Failure");
        };
    }

    // URL validation
    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Endpoint validation
    function isValidEndpoint(endpoint) {
        // Endpoint must start with '/' and contain no spaces
        return endpoint.startsWith("/") && !/\s/.test(endpoint);
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
            alert("Please fill out the URL and Endpoint fields.");
            return;
        }

        if (!isValidUrl(url)) {
            alert("Please enter a valid URL (e.g., https://example.com).");
            return;
        }

        if (!isValidEndpoint(endpoint)) {
            alert("Please enter a valid endpoint (e.g., /v1/products). Endpoints must start with '/' and contain no spaces.");
            return;
        }

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
    });

    // Save button handler
    saveBtn.addEventListener("click", function () {
        const url = urlInput.value.trim();
        const endpoint = endpointInput.value.trim();
        const datatype = datatypeSelect.value;
        const selectedTests = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.name);

        if (!url || !endpoint) {
            alert("Please fill out the URL and Endpoint fields before saving.");
            return;
        }

        if (!isValidUrl(url)) {
            alert("Please enter a valid URL (e.g., https://example.com).");
            return;
        }

        if (!isValidEndpoint(endpoint)) {
            alert("Please enter a valid endpoint (e.g., /v1/products). Endpoints must start with '/' and contain no spaces.");
            return;
        }

        const jobDetails = {
            url,
            endpoint,
            datatype,
            selectedTests,
            timestamp: new Date().toISOString()
        };

        console.log("Saving job with the following details:", jobDetails);

        // Save job details to IndexedDB
        saveToIndexedDB(jobDetails);
    });
});