import { Outlet, Route, Routes } from "react-router";
import "./App.scss";
import ConstructorsChampionshipScreen from "./components/ConstructorsChampionshipScreen";
import DriversChampionshipScreen from "./components/DriversChampionshipScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";

function App() {
  return (
    <div className="App">
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
        <Route
          path="*"
          element={
            <ErrorScreen error="We couldn't find the page you were looking for" />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
