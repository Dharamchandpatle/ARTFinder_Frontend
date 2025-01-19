import { Route, Routes } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import Header from "./components/Header";
import ChatModal from "./components/ChatModal";
import Analyse from "./pages/Analyse";
import NotFound from "./pages/PageNotFound";
// import OverviewPage from "./pages/OverviewPage";
// import FeaturesPage from "./pages/FeaturesPage";
// import TeamPage from "./pages/TeamPage";
import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 min-h-screen">
        <main className="p-8">
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            <Route path="/analyze" element={<Analyse />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/chat" element={<ChatModal />} />
            <Route path="/" element={<Analyse />} />
            {/* <Route path='/overview' element={<OverviewPage />} /> */}
            {/* <Route path="/features" element={<FeaturesPage />} /> */}
            {/* <Route path="/team" element={<TeamPage />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
