import "./Footer.styles.scss";

import GithubImage from "../../assets/images/GitHub-Mark-Light-64px.png";

function Footer() {
  return (
    <div className="Footer">
      <h3 className="Footer__title">Created by Krastan Dimitrov</h3>
      <div className="Footer__row">
        <img height="32px" width="32px" src={GithubImage} alt="Github Logo" />
        <a
          className="Footer__link"
          href="https://github.com/KrastanD/play-out-wdc"
        >
          Source Code
        </a>
      </div>
    </div>
  );
}

export default Footer;
