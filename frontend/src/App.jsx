import ActivityTable from "./components/ActivityTable";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import AuditLogsPage from "./pages/AuditLogsPage";

import DoodleBackground from "./components/DoodleBackground";
import { StarsBackground } from "./components/StarsBackground";

import {
  LayoutDashboard,
  Upload,
  ShieldCheck,
  Leaf,
} from "lucide-react";

function Dashboard() {

  return (

    <StarsBackground
      starColor="rgba(255,255,255,0.15)"
      speed={180}
      className="
        min-h-screen
        bg-[#020617]
      "
    >

      <div className="
        relative z-10
        max-w-7xl
        mx-auto
        px-6
        py-6
      ">

        <ActivityTable />

      </div>

    </StarsBackground>
  );
}

function Navigation() {

  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/upload",
      label: "Upload",
      icon: Upload,
    },
    {
      path: "/audit-logs",
      label: "Audit Logs",
      icon: ShieldCheck,
    },
  ];

  return (

    <div className="
      relative
      overflow-hidden
      bg-gray-200
      border-b
      border-gray-300
      sticky top-0
      z-50
    ">

      <div className="
        absolute inset-0
        opacity-100
      ">

        <DoodleBackground />

      </div>

      <div className="
        relative z-10
        max-w-7xl
        mx-auto
        px-6
      ">

        <div className="
          flex items-center
          justify-between
          h-16
        ">

          <div className="
            flex items-center
            gap-3
          ">

            <div className="
              bg-white
              backdrop-blur
              text-gray-800
              p-2
              rounded-xl
              border border-gray-300
              shadow-sm
            ">

              <Leaf size={18} />

            </div>

            <div>

              <p className="text-gray-700">
              <h1 className="text-gray-900 font-semibold text-lg">
                 Breathe ESG
               </h1>
               </p>
              
              <p className="text-gray-700">
                Sustainability Operations
              </p>

            </div>

          </div>

          <nav className="
            flex items-center
            gap-2
          ">

            {navItems.map((item) => {

              const Icon = item.icon;

              const isActive =
                location.pathname === item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center
                    gap-2
                    px-4 py-2
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-white text-black shadow-md"
                        : "text-gray-700 hover:bg-white hover:text-black"
                    }
                  `}
                >

                  <Icon size={16} />

                  <span>
                    {item.label}
                  </span>

                </Link>
              );
            })}

          </nav>

        </div>

      </div>

    </div>
  );
}

function App() {

  return (

    <BrowserRouter>

      <div className="
        min-h-screen
        bg-[#020617]
      ">

        <Navigation />

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<UploadPage />}
          />

          <Route
            path="/audit-logs"
            element={<AuditLogsPage />}
          />

        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;