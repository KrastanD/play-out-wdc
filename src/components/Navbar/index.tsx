import { useDispatch } from "react-redux";
import { AppVersion, changeVersion } from "../../config/configSlice";
import "./styles.scss";

function Navbar() {
  const titleText = "Play Out WDC";

  const dispatch = useDispatch();

  return (
    <nav className="Navbar">
      <div>
        <p className="Navbar__title">{titleText}</p>
      </div>
      <ul className="Navbar__list">
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WDC2022))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WDC2022))}
          >
            <p className="Navbar__itemText">2022 WDC Results</p>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WCC2022))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WCC2022))}
          >
            <p className="Navbar__itemText">2022 WCC Results</p>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WDC2021))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WDC2021))}
          >
            <p className="Navbar__itemText">2021 WDC Results</p>
          </button>
        </li>
        <li className="Navbar__option">
          <button
            className="Navbar__button"
            type="button"
            onClick={() => dispatch(changeVersion(AppVersion.WCC2021))}
            onKeyPress={() => dispatch(changeVersion(AppVersion.WCC2021))}
          >
            <p className="Navbar__itemText">2021 WCC Results</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
