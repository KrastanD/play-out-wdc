import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.styles.scss";

function Navbar() {
  const navigation = useNavigate();
  const titleText = "Play Out";

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const year = e.target.value;
    navigation(`/drivers/${year}`);
  };

  return (
    <nav className="Navbar">
      <button className="Navbar__button" type="button">
        <Link className="Navbar__title" to="/">
          {titleText}
        </Link>
      </button>
      {/*
      TODO: responsive styling
      */}
      <div className="Navbar__list">
        <select
          value="Drivers"
          className="Navbar__button Navbar__option Navbar__title"
          onChange={handleChange}
        >
          <option selected hidden>
            Drivers
          </option>
          <option>2022 </option>
          <option>2021 </option>
        </select>
      </div>

      {/* <ul className="Navbar__list">
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
      </ul> */}
    </nav>
  );
}

export default Navbar;
