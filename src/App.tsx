import { Outlet, Route, Routes } from "react-router";
import "./App.scss";
import ConstructorsChampionshipScreen from "./components/ConstructorsChampionshipScreen";
import DriversChampionshipScreen from "./components/DriversChampionshipScreen";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<DriversChampionshipScreen />} />
        <Route path="/drivers" element={<Outlet />}>
          <Route
            path="/drivers/:year"
            element={<DriversChampionshipScreen />}
          />
        </Route>
        <Route path="/constructors" element={<Outlet />}>
          <Route
            path="/constructors/:year"
            element={<ConstructorsChampionshipScreen />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
