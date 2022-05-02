import { Link } from "react-router-dom";
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
      <ul className="Navbar__list">
        <li className="Navbar__option">
          <Link className="Navbar__itemText" to="/drivers/2022">
            2022 WDC Results
          </Link>
        </li>
        <li className="Navbar__option">
          <Link className="Navbar__itemText" to="/constructors/2022">
            2022 WCC Results
          </Link>
        </li>
        <li className="Navbar__option">
          <Link className="Navbar__itemText" to="/drivers/2021">
            2021 WDC Results
          </Link>
        </li>
        <li className="Navbar__option">
          <Link className="Navbar__itemText" to="/constructors/2021">
            2021 WCC Results
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
