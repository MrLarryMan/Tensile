// Try to access OS files. Assuming a linux server environment.
exports.LFIScan = async (url, reqType, dataType) => {
    // We ignore dataType for this type of test.

    const options = {
        method: reqType,
    };
    // Test up to 10 nested directories
    for(let i = 0; i < 10; i++) {
        let output = await fetch(url + "../" * i + "etc/passwd", options);
        // if root:x:0:0: is in the output, this indicates that we successfully read /etc/passwd
        if(output.includes('root:x:0:0:')) {
            return [{
                "category": "LFI (Local File Inclusion",
                "payload": url + "../" * i + "etc/passwd",
                "recommendations": "Review the allowed routes of your website, and make sure that only intended files are included. Sanitize filepaths and avoid user-inputted filepaths."
            }]
        }
    }
    return [];
}