import { useSelector } from "react-redux";
import { AppVersion } from "../../config/configSlice";
import { StoreType } from "../../store";

const Instructions = () => {
  const version = useSelector((state: StoreType) => state.config.version);

  const backgroundStyle = `col col-sm-6 rounded my-2 bg-opacity-10 ${
    version === AppVersion.WDC ? "bg-danger" : "bg-success"
  }`;

  return (
    <div className="container">
      <div className="row justify-content-sm-center">
        <div className={backgroundStyle}>
          <h5 className="d-sm-none text-center">
            Instructions
            <br />
            Tap -{">"} {version === AppVersion.WDC ? "Max" : "Red Bull"}
            <br />
            Long Press -{">"}{" "}
            {version === AppVersion.WDC ? "Lewis" : "Mercedes"}
          </h5>
          <h5 className="d-none d-sm-block text-center">
            Instructions
            <br />
            Left Click -{">"} {version === AppVersion.WDC ? "Max" : "Red Bull"}
            <br />
            Right Click -{">"}{" "}
            {version === AppVersion.WDC ? "Lewis" : "Mercedes"}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
