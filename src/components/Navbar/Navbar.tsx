import { Link } from "react-router-dom";
import { AppVersion, changeVersion } from "../../slices/configSlice";
import { useAppDispatch } from "../../store";
import "./Navbar.styles.scss";

function Navbar() {
  const titleText = "Play Out";

  const dispatch = useAppDispatch();

  return (
    <nav className="Navbar">
      <p className="Navbar__title">{titleText}</p>
      <ul className="Navbar__list">
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WDC2022))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WDC2022))}
          >
            <Link className="Navbar__itemText" to="/">
              2022 WDC Results
            </Link>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WCC2022))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WCC2022))}
          >
            <Link className="Navbar__itemText" to="/constructors">
              2022 WCC Results
            </Link>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WDC2021))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WDC2021))}
          >
            <Link className="Navbar__itemText" to="/2021">
              2021 WDC Results
            </Link>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WCC2021))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WCC2021))}
          >
            <Link className="Navbar__itemText" to="/constructors/2021">
              2021 WCC Results
            </Link>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
