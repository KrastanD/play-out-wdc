import { useState } from "react";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = (linkto: string) => {
    navigation(linkto);
    setShowDropdown(false);
  };
  return (
    <div
      className="Dropdown"
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      {title}
      {showDropdown && (
        <ul className="Dropdown__list">
          {items.map((item) => (
            <li key={item.text}>
              <button
                className="Dropdown__item"
                onClick={() => handleClick(item.linkto)}
                type="button"
              >
                {item.text}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
