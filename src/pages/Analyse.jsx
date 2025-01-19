import React, { useState } from "react";
import InsightComponent from "../components/DataAnalyzer";
import DataVisualizer from "./DataVisualizer";

const Analyse = () => {
  const [postUrl, setPostUrl] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [adIdeas, setAdIdeas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText}`);
      }

      const result = await response.json();
      setJsonData({
        message: "Data successfully sent and analyzed.",
        data: result,
      });

      fetchAnalysisData();
    } catch (error) {
      setJsonData({
        message: "Failed to process the data.",
        error: error.message,
      });
    }
  };

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
      setAnalysisData(data.response);
      suggestYoutubeLinks(data.response);
      suggestAdIdeas(data.response);
    } catch (error) {
      console.error("Error fetching analysis data:", error);
      setAnalysisData(null);
    }
  };

  const suggestYoutubeLinks = (analysis) => {
    const links = [
      `https://www.youtube.com/results?search_query=${analysis.keywords} trend analysis`,
      `https://www.youtube.com/results?search_query=${analysis.keywords} marketing tips`,
      `https://www.youtube.com/results?search_query=${analysis.keywords} social media strategies`,
    ];
    setYoutubeLinks(links);
  };

  const suggestAdIdeas = (analysis) => {
    const ideas = [
      `Create a video highlighting ${analysis.keywords} trends with visuals.`,
      `Target specific audience segments using ${analysis.keywords} in your ad copy.`,
      `Leverage influencer collaborations to promote ${analysis.keywords} in ads.`,
    ];
    setAdIdeas(ideas);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl"> {/* Increased width to max-w-2xl */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 font-serif">ART Finder </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="postUrl" className="block text-gray-700 font-medium">Post URL:</label>
            <input
              type="text"
              id="postUrl"
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="Enter the Post URL"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="hashtags" className="block text-gray-700 font-medium">Hashtags:</label>
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="Enter hashtags (comma-separated)"
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg text-lg font-semibold hover:bg-teal-600 transition duration-300"
          >
            Analyze Trend
          </button>
        </form>

        {jsonData && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">{jsonData.message}</h2>
            {jsonData.error && <p className="text-red-600">{jsonData.error}</p>}
            {jsonData.data && (
              <pre className="bg-gray-100 p-4 rounded-md mt-4 overflow-x-auto">
                {JSON.stringify(jsonData.data, null, 2)}
              </pre>
            )}
          </div>
        )}

        {analysisData && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Competitor Analysis</h3>
            <p><InsightComponent text={analysisData} /></p>

            <DataVisualizer hashtags={hashtags} /> {/* Visualization Component */}

            <h4 className="mt-4 text-xl font-semibold">Suggested YouTube Links:</h4>
            <ul className="list-disc pl-5 mt-2">
              {youtubeLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{link}</a>
                </li>
              ))}
            </ul>

            <h4 className="mt-4 text-xl font-semibold">Suggested Ad Ideas:</h4>
            <ul className="list-disc pl-5 mt-2">
              {adIdeas.map((idea, index) => (
                <li key={index} className="text-gray-800">{idea}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyse;
