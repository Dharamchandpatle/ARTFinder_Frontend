import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #FF7EB9, #D5A6FF)", // Pink to Purple gradient
      }}
    >
      <div className="flex-col text-center space-y-6">
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold">
          404 Not Found
        </h1>
        <p className="text-white text-lg sm:text-xl mb-4">
          The page you are looking for doesn't exist.
        </p>
        <button
          className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 text-base sm:text-lg w-full sm:w-auto"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
