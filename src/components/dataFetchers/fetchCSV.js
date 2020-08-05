/* eslint-disable */
import { useState, useEffect } from "react";
import { csv } from "d3";

function fetchCSV(url, row) {
    const [csvData, setCsvData] = useState([]);

    async function fetchUrl() {
        const response = await fetch(url);
        await csv(response.url, row).then(setCsvData);
    }
    useEffect(() => {
        fetchUrl()
    }, []);
    return [csvData];
}
export { fetchCSV }