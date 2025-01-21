import { Navigate, Outlet, Route, Routes } from "react-router";
import "./App.scss";
import ConstructorsChampionshipScreen from "./components/ConstructorsChampionshipScreen";
import DriversChampionshipScreen from "./components/DriversChampionshipScreen";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ErrorScreen from "./components/ErrorScreen/ErrorScreen";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ErrorBoundary fallback={<ErrorScreen error="Something went wrong :(" />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={`/drivers/${new Date().getFullYear()}`} />}
          />
          <Route path="drivers" element={<Outlet />}>
            <Route path=":year" element={<DriversChampionshipScreen />} />
          </Route>
          <Route path="constructors" element={<Outlet />}>
            <Route path=":year" element={<ConstructorsChampionshipScreen />} />
          </Route>
          <Route
            path="*"
            element={
              <ErrorScreen error="We couldn't find the page you were looking for" />
            }
          />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default App;
