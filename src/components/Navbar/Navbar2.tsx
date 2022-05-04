import { Link, useNavigate } from "react-router-dom";
import "./Navbar.styles.scss";

function Navbar() {
  const navigation = useNavigate();
  const titleText = "Play Out";

  return (
    <nav className="Navbar">
      <button className="Navbar__button" type="button">
        <Link className="Navbar__title" to="/">
          {titleText}
        </Link>
      </button>
      <div className="Navbar__menuContainer">
        <div className="Navbar__menuItem">
          Drivers
          <div className="Navbar__dropdown">
            <ul className="Navbar__list2">
              <li>
                <button
                  className="Navbar__dropdownItem"
                  onClick={() => navigation(`/drivers/2022`)}
                  type="button"
                >
                  2022
                </button>
              </li>
              <li>
                <button
                  className="Navbar__dropdownItem"
                  onClick={() => navigation(`/drivers/2021`)}
                  type="button"
                >
                  2021
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="Navbar__menuItem">
          Constructors
          <div className="Navbar__dropdown">
            <ul className="Navbar__list2">
              <li>
                <button
                  className="Navbar__dropdownItem"
                  onClick={() => navigation(`/constructors/2022`)}
                  type="button"
                >
                  2022
                </button>
              </li>
              <li>
                <button
                  className="Navbar__dropdownItem"
                  onClick={() => navigation(`/constructors/2021`)}
                  type="button"
                >
                  2021
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
