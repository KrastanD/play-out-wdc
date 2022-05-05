import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import "./Navbar.styles.scss";

function Navbar() {
  const titleText = "Play Out";

  return (
    <nav className="Navbar">
      <button className="Navbar__button" type="button">
        <Link className="Navbar__title" to="/">
          {titleText}
        </Link>
      </button>
      <div className="Navbar__container">
        <Dropdown
          title="Drivers"
          items={[
            { text: "2022", linkto: "/drivers/2022" },
            { text: "2021", linkto: "/drivers/2021" },
          ]}
        />
        <Dropdown
          title="Constructors"
          items={[
            { text: "2022", linkto: "/constructors/2022" },
            { text: "2021", linkto: "/constructors/2021" },
          ]}
        />
      </div>
    </nav>
  );
}

export default Navbar;
