import { Link } from "react-router-dom";
import Dropdown, { DropdownOption } from "../Dropdown";
import "./Navbar.styles.scss";

function getDropdownOptions(path: string) {
  const START_YEAR = 2010;
  const currYear = new Date().getFullYear();
  const yearArray: DropdownOption[] = [];
  for (let year = currYear; year >= START_YEAR; year -= 1) {
    yearArray.push({ text: year.toString(), linkto: `${path}/${year}` });
  }
  return yearArray;
}

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
        <Dropdown title="Drivers" items={getDropdownOptions("/drivers")} />
        <Dropdown
          title="Constructors"
          items={getDropdownOptions("/constructors")}
        />
      </div>
    </nav>
  );
}

export default Navbar;
