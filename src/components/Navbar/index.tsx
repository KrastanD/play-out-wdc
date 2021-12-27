import "./styles.scss";
import { useSelector } from "react-redux";
import { AppVersion } from "../../config/configSlice";
import { StoreType } from "../../store";

const Navbar = () => {
  let navStyle = "navbar navbar-light";
  let titleText = "Play Out WDC";
  let linkOutText = "WCC →";
  let linkoOutStyle = "linkOutButton";
  let linkOut = "https://playoutwcc.krastan.com";

  const version = useSelector((state: StoreType) => state.config.version);
  // const dispatch = useDispatch();

  if (version === AppVersion.WDC) {
    navStyle += " bg-danger";
    linkoOutStyle += " linkOutWCC";
  } else {
    navStyle += " bg-success";
    linkoOutStyle += " linkOutWDC";
    titleText = "Play Out WCC";
    linkOutText = "WDC →";
    linkOut = "https://playoutwdc.krastan.com";
  }

  return (
    <nav className={navStyle}>
      <button
        className="removeButtonStyle"
        // onClick={() => dispatch(switchVersion())}
      >
        <h3 className="mx-4 my-1 text-light">{titleText}</h3>
      </button>
      <button
        className={linkoOutStyle}
        onClick={() => {
          window.location.href = linkOut;
        }}
      >
        <h3 className="mx-4 my-1 text-light">{linkOutText}</h3>
      </button>
    </nav>
  );
};

export default Navbar;
