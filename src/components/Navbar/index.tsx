import "./styles.scss";
import { useSelector } from "react-redux";
import { AppVersion } from "../../config/configSlice";
import { StoreType } from "../../store";

const Navbar = () => {
  let navStyle = "navbar navbar-light";
  let titleText = "Play Out WDC";

  const version = useSelector((state: StoreType) => state.config.version);
  // const dispatch = useDispatch();

  if (version === AppVersion.WDC) {
    navStyle += " bg-danger";
  } else {
    navStyle += " bg-success";
    titleText = "Play Out WCC";
  }

  return (
    <nav className={navStyle}>
      <button
        className="removeButtonStyle"
        // onClick={() => dispatch(switchVersion())}
      >
        <h3 className="mx-4 my-1 text-light">{titleText}</h3>
      </button>
    </nav>
  );
};

export default Navbar;
