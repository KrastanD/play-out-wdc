import { useNavigate } from "react-router-dom";
import "./Dropdown.styles.scss";

export interface DropdownOption {
  text: string;
  linkto: string;
}
type DropdownProps = {
  title: string;
  items: DropdownOption[];
};

function Dropdown({ title, items }: DropdownProps) {
  const navigation = useNavigate();
  return (
    <div className="Dropdown">
      {title}
      <ul className="Dropdown__list">
        {items.map((item) => (
          <li key={item.text}>
            <button
              className="Dropdown__item"
              onClick={() => navigation(item.linkto)}
              type="button"
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
