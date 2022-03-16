import { useDispatch, useSelector } from "react-redux";
import {
  AppVersion,
  changeVersion,
  selectConfigVersion,
} from "../../config/configSlice";
import "./styles.scss";

const Navbar = () => {
  let navStyle = "navbar navbar-light";
  let titleText = "Play Out WDC";

  const version = useSelector(selectConfigVersion);
  const dispatch = useDispatch();

  if (version === AppVersion.WDC) {
    navStyle += " bg-danger";
  } else {
    navStyle += " bg-success";
    titleText = "Play Out WCC";
  }

  return (
    <nav className={navStyle}>
      <button className="removeButtonStyle">
        <h3 className="mx-4 my-1 text-light">{titleText}</h3>
      </button>
      <div>
        <button
          className="removeButtonStyle"
          onClick={() => dispatch(changeVersion(AppVersion.WDC))}
        >
          <p className="mx-4 my-1 text-light Navbar--item">WDC Past Results</p>
        </button>
        <button
          className="removeButtonStyle"
          onClick={() => dispatch(changeVersion(AppVersion.WCC))}
        >
          <p className="mx-4 my-1 text-light Navbar--item">WCC Past Results</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
