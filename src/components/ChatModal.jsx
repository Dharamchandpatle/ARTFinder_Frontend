import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import { useState, useEffect } from "react";
import './chatcss.css';
import InsightComponent from "./DataAnalyzer";

const ChatModal = ({ isHidden, setIsHidden, userid }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [chatText, setChatText] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Fetch chat history from the backend directly
  const fetchChatHistory = async () => {
    if (!userid) {
      console.error("User ID is required to fetch chat history.");
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch(`https://art-finder-server-khaki.vercel.app/chatHistory?userid=${userid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat history.");
      }

      const data = await response.json();
      setChatHistory(data.chatHistory); // assuming the backend returns a `chatHistory` array
    } catch (error) {
      console.error("Error fetching chat history:", error.message);
    } finally {
      setIsThinking(false);
    }
  };

  // Send user message and get AI response
  const sendText = async () => {
    if (!chatText.trim()) return;

    const userMessage = chatText.trim();
    setChatText("");

    // Add user message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        type: "Human",
        text: userMessage,
      },
    ]);

    // Fetch AI response
    await fetchAIResponse(userMessage);
  };

  // Fetch AI response based on user input
  const fetchAIResponse = async (prompt) => {
    if (!userid) {
      return;
    }

    setIsThinking(true);

    try {
      const response = await fetch("https://art-finder-server-khaki.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response.");
      }

      const data = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "AI",
          text: data.response || "No response from AI.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error.message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          type: "AI",
          text: "Error: Unable to process the request.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Fetch chat history when the component mounts or when the `userid` changes
  useEffect(() => {
    if (userid) {
      fetchChatHistory();
    }
  }, [userid]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen flex items-center justify-center backdrop-blur-sm ${
        isHidden && "hidden"
      } z-50`}
    >
      <div className="w-3/4 h-4/5 bg-neutral-900 px-5 py-7 rounded-md shadow-md shadow-black chat">
        <div className="flex items-center justify-between">
          <ChatBubbleRoundedIcon className="text-neutral-700" />
          <CloseRoundedIcon
            className="text-white cursor-pointer"
            onClick={() => setIsHidden(true)}
          />
        </div>

        {/* Chat box */}
        <div className="w-full h-full flex flex-col flex-1">
          <div className="flex-[0.9] w-full px-6 py-5 space-y-7 overflow-y-scroll no-scrollbar">
            {chatHistory.map((history, index) => (
              <div
                className={`rounded-md ${
                  history.type === "Human"
                    ? "w-[400px] ml-auto bg-blue-800"
                    : "w-[470px] mr-auto bg-neutral-700"
                } px-5 py-3 chatwidth`}
                key={index}
              >
                <p className="text-white">
                  <InsightComponent text={history.text} />
                </p>
              </div>
            ))}
            {isThinking && (
              <div className="w-[200px] mr-auto px-5 py-3">
                <p className="bg-gradient-to-r from-orange-400 to-indigo-400 inline-block text-transparent bg-clip-text">
                  Flow running...
                </p>
              </div>
            )}
          </div>

          <div className="flex-[0.1] w-full flex items-center justify-center">
            <div className="w-3/4 flex items-center bg-black px-5 py-2 rounded-full">
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-600 outline-none text-slate-400"
                placeholder="Chat with the model"
              />
              <SendRoundedIcon
                className="text-neutral-600 cursor-pointer"
                onClick={sendText}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
