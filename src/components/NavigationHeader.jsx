import { Link } from "react-router-dom";
import { styledLi } from "../helpers/tailwindClasses";

function NavigationHeader() {
  return (
    <nav className="">
      <ul className="flex gap-6">
        <li className={styledLi}>
          <Link to="/"></Link>Головна
        </li>
        <li className={styledLi}>
          <Link to=""></Link>Про нас
        </li>
        <li className={styledLi}>
          <Link to=""></Link>Аукціон
        </li>
      </ul>
    </nav>
  );
}

export default NavigationHeader;
