import { Link } from "react-router-dom";

function Logo() {
  return (
    <section className=" w-2/5 ">
      <Link to="/" className="flex w-fit items-center">
        <span className="text-6xl">❤️</span>
        <span className="text-l pt-3 w-28 font-extrabold">
          СЕРЦЕ В<br />
          ЛОТАХ
        </span>
      </Link>
    </section>
  );
}

export default Logo;
