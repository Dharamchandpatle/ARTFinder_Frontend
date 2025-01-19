import { Route, Routes } from "react-router-dom";
// import Homepage from "./pages/Homepage";
// import Header from "./components/Header";
import ChatModal from "./components/ChatModal";
import Analyse from "./pages/Analyse";
import NotFound from "./pages/PageNotFound";
// import OverviewPage from "./pages/OverviewPage";
// import FeaturesPage from "./pages/FeaturesPage";
// import TeamPage from "./pages/TeamPage";
// import Sidebar from "./components/Sidebar"
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      {/* <div className=""> */}
      <div className="">
        {/*BG*/}
        {/* <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-10"/>
          <div className="absolute inset-0"/>
        </div> */}
        {/* <Sidebar /> */}
        {/* <Header/> */}

        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/analyze" element={<Analyse />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/chat" element={<ChatModal />} />
          <Route path='/' element={<Analyse />} />
          {/* <Route path='/overview' element={<OverviewPage />} /> */}
          {/* <Route path="/features" element={<FeaturesPage />} /> */}
          {/* <Route path="/team" element={<TeamPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
