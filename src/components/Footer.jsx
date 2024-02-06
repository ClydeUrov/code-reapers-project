import Logo from "./Logo";
import { FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="mx-auto mt-10 flex h-[212px] w-full gap-x-60 bg-gray-300">
      <div className="ml-16 flex items-center">
        <Logo className="w-60" />
      </div>
      <div id="contacts" className="mt-8 flex w-[800px] flex-col gap-6">
        <div className="mb-8 flex justify-center gap-10">
          <p>Головна</p>
          <p>Про нас</p>
          <p>Аукціон</p>
        </div>
        <div className="flex justify-center gap-10">
          <p>Звітність</p>
          <p>Політика конфіденційності</p>
          <p>Правила користування сайтом</p>
        </div>
        <p className="text-center text-slate-500">
          СЕРЦЕ В ЛОТАХ 2023 (©) Усі права захищені
        </p>
      </div>
      <div
        id="icons"
        className="mr-16 flex w-56 items-center justify-center space-x-5"
      >
        <FaFacebook className="text-3xl" />
        <FaInstagramSquare className="text-3xl" />
        <FaTelegram className="text-3xl" />

        <p className="text-lg">UA</p>
      </div>
    </div>
  );
};

export default Footer;
