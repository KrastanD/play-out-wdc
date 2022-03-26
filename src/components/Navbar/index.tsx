import { useDispatch } from "react-redux";
import { AppVersion, changeVersion } from "../../config/configSlice";
import "./styles.scss";

const Navbar = () => {
  let titleText = "Play Out WDC";

  const dispatch = useDispatch();

  return (
    <nav className="Navbar">
      <div>
        <p className="Navbar__title">{titleText}</p>
      </div>
      <ul className="Navbar__list">
        <li
          className="Navbar__option"
          onClick={() => dispatch(changeVersion(AppVersion.WDC))}
        >
          <p className="Navbar--itemText">2021 WDC Results</p>
        </li>
        <li
          className="Navbar__option"
          onClick={() => dispatch(changeVersion(AppVersion.WCC))}
        >
          <p className="Navbar--itemText">2021 WCC Results</p>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
