import { Link, useLocation, useNavigate } from "react-router-dom";
import { styledLi } from "../../helpers/tailwindClasses";

function NavigationHeader() {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  function scrollTo(id) {
    if (document.querySelector(id)) {
      document
        .querySelector(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/");
    }
  }

  return (
    <nav>
      <ul className="flex gap-6">
        <li className={styledLi}>
          <span onClick={() => scrollTo("#main")}>Головна</span>
        </li>
        <li className={styledLi}>
          <span onClick={() => scrollTo("#aboutUs")}>Про нас</span>
        </li>
        <li className={styledLi}>
          <span>Аукціон</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationHeader;
