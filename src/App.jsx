import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Dashboard from "./components/dashboard";
import Header from "./components/header";
import CreatePlayer from "./components/createPlayer";
import UpdatePlayer from "./components/updatePlayer";
import PlayerDetails from "./components/playerDetails";

function App() {
  return (
    <div>
      <div className="fixed-header-container">
        <Header />
      </div>

      <div className="content-below-header">
        <div className="tab-content-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/createPlayer" element={<CreatePlayer />} />
            <Route path="/updatePlayer/:playerID" element={<UpdatePlayer />} />
            <Route path="/playerDetails" element={<PlayerDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;