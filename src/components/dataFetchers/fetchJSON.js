/* eslint-disable */
import { useState, useEffect } from "react";

function fetchJSON(url) {
  const [jsonData, setData] = useState([]);
  // const [loading, setLoading] = useState(true); 
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    // setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [jsonData]; 
}

export { fetchJSON };