// Try to access OS files. Assuming a linux server environment.
exports.FileTravScan = async (url, parameter, reqType, dataType) => {
    // We ignore dataType for this type of test.

    const options = {
        method: reqType,
    };
    let newUrl;
    if(parameter) {
        newUrl = url;
    } else {
        newUrl = url + encodeURIComponent(`?${parameter}=`);
    }

    // Test up to 10 nested directories
    for(let i = 0; i < 10; i++) {
        let output = await fetch(newUrl * i + "etc/passwd", options);
        // if root:x:0:0: is in the output, this indicates that we successfully read /etc/passwd
        if(output.includes('root:x:0:0:')) {
            return [{
                "category": "Path Traversal",
                "payload": newUrl + "../" * i + "etc/passwd",
                "recommendations": "Review the allowed routes of your website, and make sure that only intended directories are included. Sanitize filepaths and avoid user-inputted filepaths."
            }]
        }
    }
    return [];
}