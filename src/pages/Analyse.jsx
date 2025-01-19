import React, { useState } from "react";

const Analyse = () => {
  const [postUrl, setPostUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure both inputs are filled
    if (!postUrl || !hashtags) {
      setJsonData({
        message: "Please provide both Post URL and hashtags.",
        error: "Input fields are required.",
      });
      return;
    }

    const payload = {
      posts: [{ post_url: postUrl, hashtags }],
    };

    try {
      const response = await fetch("https://art-finder-server-khaki.vercel.app/put-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is OK
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      // Parse JSON response
      const result = await response.json();
      setJsonData({
        message: "Data successfully sent and analyzed.",
        data: result,
      });

      // Call fetchAnalysisData after data is successfully sent
      fetchAnalysisData(); // <-- This line is crucial to trigger analysis
    } catch (error) {
      setJsonData({
        message: "Failed to process the data.",
        error: error.message,
      });
    }
  };

  // Function to call /analyse-posts API to analyze posts using GET method
  const fetchAnalysisData = async () => {
    if (!hashtags) {
      setJsonData({
        message: "Please provide hashtags for analysis.",
        error: "Hashtags are required.",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://art-finder-server-khaki.vercel.app/analyse-posts`
      );

      if (!response.ok) {
        throw new Error("Error fetching analysis data.");
      }

      const data = await response.json();
      console.log("Fetched analysis data:", data); // Debugging log
      setAnalysisData(data.response); // Set the AI analysis data
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setAnalysisData(null);
    }
  };

  return (
    <div>
      <h1>Analyze Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="postUrl">Post URL:</label>
          <input
            type="text"
            id="postUrl"
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
            placeholder="Enter the Post URL"
            required
          />
        </div>
        <div>
          <label htmlFor="hashtags">Hashtags:</label>
          <input
            type="text"
            id="hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="Enter hashtags (comma-separated)"
            required
          />
        </div>
        <button type="submit">Analyze</button>
      </form>

      {jsonData && (
        <div>
          <h2>{jsonData.message}</h2>
          {jsonData.error && <p style={{ color: "red" }}>{jsonData.error}</p>}
          {jsonData.data && (
            <pre style={{ textAlign: "left" }}>
              {JSON.stringify(jsonData.data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Display analysis results */}
      {fetchAnalysisData && (
        <div>
          <h3>Competitor Analysis</h3>
          <p>{analysisData}</p> {/* Display the AI analysis result */}
        </div>
      )}
    </div>
  );
};

export default Analyse;
