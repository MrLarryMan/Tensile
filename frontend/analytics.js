import { getInitialHistoryData } from "./fetch.js"

addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await getInitialHistoryData();
        console.log(data); 
    } catch(error) {
        console.error(`Error fetching data: ${error}`)
    }
}); 