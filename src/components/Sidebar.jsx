import { FaChartBar, FaHome, FaInfoCircle, FaRobot, FaUsers } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/analyze', name: 'Analyze', icon: <FaChartBar /> },
    { path: '/chat', name: 'AI Chat', icon: <FaRobot /> },
    { path: '/overview', name: 'Overview', icon: <FaInfoCircle /> },
    { path: '/team', name: 'Team', icon: <FaUsers /> },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white shadow-xl">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-8">ARTFinder</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-white/20 text-white'
                      : 'hover:bg-white/10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-4 bg-purple-950/50">
        <div className="text-sm text-gray-300">
          <p>© 2024 ARTFinder</p>
          <p>All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 