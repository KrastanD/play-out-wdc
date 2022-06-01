import { useLocation } from "react-router-dom";

import "./Title.styles.scss";

function Title() {
  const location = useLocation();
  const path = location.pathname;
  const championship = path.split("/")[1] || "drivers";
  const year = path.split("/")[2] || new Date().getFullYear();

  return <h2 className="Title">{`${championship}' Championship ${year}`}</h2>;
}

export default Title;
