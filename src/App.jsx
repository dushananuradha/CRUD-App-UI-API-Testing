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
    <>
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/createPlayer" element={<CreatePlayer />}></Route>
          <Route
            path="/updatePlayer/:playerID"
            element={<UpdatePlayer />}
          ></Route>
          <Route path="/playerDetails" element={<PlayerDetails />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
