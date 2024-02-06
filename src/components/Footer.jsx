

const Footer = () => {
  return (
    <div className="w-full h-[212px] flex gap-x-96 mx-auto bg-gray-300 mt-10">
      <div><img /></div>
      <div id="contacts" className="flex flex-col gap-6 w-full mt-8">
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
      <div id="icons">
      </div>
    </div>
  )
}

export default Footer;