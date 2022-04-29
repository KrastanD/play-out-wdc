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
