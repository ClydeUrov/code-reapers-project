import Logo from "./Logo";
import { FaFacebook, FaInstagramSquare, FaTelegram } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="w-full h-[212px] flex gap-x-60 mx-auto bg-gray-300 mt-10">
      <div className="ml-16 flex items-center">
        <Logo className="w-60" />
      </div>
      <div id="contacts" className="flex flex-col gap-6 w-[800px] mt-8">
        <div className="flex gap-10 justify-center mb-8">
          <p>Головна</p>
          <p>Про нас</p>
          <p>Аукціон</p>
        </div>
        <div className="flex gap-10 justify-center">
          <p>Звітність</p>
          <p>Політика конфіденційності</p>
          <p>Правила користування сайтом</p>
        </div>
        <p className="text-center text-slate-500">СЕРЦЕ В ЛОТАХ 2023 (©) Усі права захищені</p>
      </div>
      <div id="icons" className="flex w-56 items-center justify-center space-x-5 mr-16">
        <FaFacebook className="text-3xl" />
        <FaInstagramSquare className="text-3xl" />
        <FaTelegram className="text-3xl" />

        <p className="text-2xl font-bold">UA</p>
      </div>
    </div>
  )
}

export default Footer;